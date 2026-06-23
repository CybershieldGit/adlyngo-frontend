"use client";

import { useEffect, useRef, useState } from "react";

function parseStatValue(value) {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", target: 0, suffix: value, decimals: 0 };
  }

  const [, prefix, num, suffix] = match;
  const target = parseFloat(num);
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;

  return { prefix, target, suffix, decimals };
}

function formatValue(prefix, current, suffix, decimals) {
  const formatted =
    decimals > 0 ? current.toFixed(decimals) : String(Math.round(current));
  return `${prefix}${formatted}${suffix}`;
}

export default function CountUpValue({ value, duration = 2000, className }) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);
  const { prefix, target, suffix, decimals } = parseStatValue(value);
  const [display, setDisplay] = useState(() => formatValue(prefix, 0, suffix, decimals));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          const current = target * eased;

          setDisplay(formatValue(prefix, current, suffix, decimals));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, prefix, target, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
