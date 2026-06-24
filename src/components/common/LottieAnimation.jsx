"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { cn } from "@/lib/utils";

const FUNNEL_BG_RGBA = [26 / 255, 26 / 255, 26 / 255, 1];

function isBackgroundLayerName(name) {
  return /(?:^|\b)(?:bg|background|back)(?:\b|\s)|solid/i.test(name);
}

function normalizeLottieBackground(data, bgHex) {
  const clone = JSON.parse(JSON.stringify(data));
  const rootW = clone.w || 0;
  const rootH = clone.h || 0;

  const processLayers = (layers) => {
    if (!layers) return;

    layers.forEach((layer) => {
      const name = (layer.nm || "").toLowerCase();
      const isBackgroundLayer = isBackgroundLayerName(name);

      if (layer.ty === 1) {
        const isFullSize =
          (layer.sw || 0) >= rootW * 0.85 && (layer.sh || 0) >= rootH * 0.85;

        if (isBackgroundLayer || isFullSize) {
          layer.sc = bgHex;
        }
      }

      if (layer.ty === 4 && isBackgroundLayer) {
        const items = (layer.shapes || []).flatMap((shape) => shape.it || []);
        const fill = items.find((item) => item.ty === "fl");

        if (fill?.c?.k && Array.isArray(fill.c.k)) {
          fill.c.k = FUNNEL_BG_RGBA;
        }
      }
    });
  };

  processLayers(clone.layers);
  clone.assets?.forEach((asset) => processLayers(asset.layers));

  return clone;
}

export default function LottieAnimation({
  src,
  className,
  ariaLabel = "",
  blendWith = "",
}) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setAnimationData(blendWith ? normalizeLottieBackground(data, blendWith) : data);
        }
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [src, blendWith]);

  if (!animationData) {
    return (
      <div
        className={cn("h-full w-full", className)}
        style={blendWith ? { backgroundColor: blendWith } : undefined}
        aria-hidden={!ariaLabel}
      />
    );
  }

  const lottie = (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      className={cn("h-full w-full", className)}
      aria-label={ariaLabel || undefined}
      role={ariaLabel ? "img" : undefined}
    />
  );

  if (!blendWith) return lottie;

  return (
    <div className="h-full w-full" style={{ backgroundColor: blendWith }}>
      {lottie}
    </div>
  );
}
