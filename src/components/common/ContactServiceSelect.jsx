"use client";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const SERVICE_OPTIONS = [
  "Website Development",
  "UGC Ads",
  "Social Media Management",
  "Performance Marketing",
  "Video Production",
  "Brand Strategy",
];

export const BUDGET_OPTIONS = [
  "Under ₹1L",
  "₹1L - ₹3L",
  "₹3L - ₹5L",
  "₹5L+",
  "Not decided",
];

const VISIBLE_BADGE_COUNT = 3;

function normalizeSelected(value, multiple) {
  if (multiple) {
    return Array.isArray(value) ? value : value ? [value] : [];
  }

  return value ? [value] : [];
}

function getTriggerLabel(selected, placeholder, multiple) {
  if (!selected.length) return placeholder;
  if (!multiple || selected.length === 1) return selected[0];
  return `${selected.length} services selected`;
}

export default function ContactServiceSelect({
  value,
  onChange,
  options = SERVICE_OPTIONS,
  multiple = true,
  hasError = false,
  variant = "underline",
  placeholder = "Select Service",
  menuZIndex = 10050,
}) {
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const selected = normalizeSelected(value, multiple);
  const isBoxed = variant === "boxed";

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open || !rootRef.current) {
      setMenuPosition(null);
      return;
    }

    const updatePosition = () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      const rootRect = rootRef.current?.getBoundingClientRect();
      if (!triggerRect || !rootRect) return;

      const hasBadges = multiple && selected.length > 1;
      const anchorRect = hasBadges ? rootRect : triggerRect;
      const menuGap = hasBadges ? 6 : 2;
      const spaceBelow = window.innerHeight - anchorRect.bottom - 16;
      const spaceAbove = triggerRect.top - 16;
      const openUpward = spaceBelow < 280 && spaceAbove > spaceBelow;
      const maxHeight = Math.max(180, Math.min(320, openUpward ? spaceAbove - menuGap : spaceBelow - menuGap));

      setMenuPosition({
        left: triggerRect.left,
        width: triggerRect.width,
        top: openUpward ? undefined : anchorRect.bottom + menuGap,
        bottom: openUpward ? window.innerHeight - triggerRect.top + menuGap : undefined,
        maxHeight,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, selected.length, multiple]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      const target = event.target;
      if (
        rootRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleOptionClick = (option) => {
    if (multiple) {
      if (selected.includes(option)) {
        onChange(selected.filter((item) => item !== option));
        return;
      }

      onChange([...selected, option]);
      return;
    }

    onChange(option);
    setOpen(false);
  };

  const menu = open && menuPosition && mounted
    ? createPortal(
        <div
          ref={menuRef}
          data-form-select-menu
          role="listbox"
          aria-multiselectable={multiple}
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          style={{
            position: "fixed",
            left: menuPosition.left,
            width: menuPosition.width,
            top: menuPosition.top,
            bottom: menuPosition.bottom,
            maxHeight: menuPosition.maxHeight,
            zIndex: menuZIndex,
          }}
          className="flex flex-col gap-1 overflow-y-auto rounded-2xl border border-white/10 bg-[#111111] p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] no-scrollbar"
        >
          {options.map((option) => {
            const isSelected = selected.includes(option);

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleOptionClick(option)}
                className={cn(
                  "flex w-full shrink-0 items-center justify-between gap-3 rounded-xl px-3.5 py-2 text-left font-albert text-[13px] font-bold tracking-wide transition-all duration-200",
                  isBoxed ? "normal-case" : "uppercase",
                  isSelected
                    ? "bg-[#FF6A00] text-white shadow-[0_8px_24px_rgba(255,106,0,0.25)]"
                    : "text-white/55 hover:bg-white/[0.05] hover:text-white"
                )}
              >
                <span className="flex items-center gap-3">
                  {multiple && (
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                        isSelected ? "border-white bg-white/20" : "border-white/25 bg-transparent"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
                  )}
                  {option}
                </span>
                {!multiple && isSelected && <Check className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>,
        document.body
      )
    : null;

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex w-full items-center justify-between gap-3 text-left outline-none font-albert transition-all",
          isBoxed
            ? cn(
                "rounded-xl border px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm normal-case",
                hasError
                  ? "border-red-500/50 bg-white/[0.02]"
                  : open
                    ? "border-[#FF6A00]/50 bg-white/[0.02]"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
              )
            : "bg-transparent text-base uppercase font-bold",
          selected.length ? "text-white" : "text-white/20",
          !isBoxed && hasError && "text-red-300"
        )}
      >
        <span className="line-clamp-2 text-left">{getTriggerLabel(selected, placeholder, multiple)}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-white/40 transition-transform duration-200",
            open && "rotate-180 text-[#FF6A00]"
          )}
        />
      </button>

      {multiple && selected.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selected.slice(0, VISIBLE_BADGE_COUNT).map((item) => (
            <span
              key={item}
              className={cn(
                "rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10 px-2.5 py-1 font-albert text-[10px] font-bold tracking-wide text-white",
                isBoxed ? "normal-case" : "uppercase"
              )}
            >
              {item}
            </span>
          ))}
          {selected.length > VISIBLE_BADGE_COUNT && (
            <span className="rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/15 px-2.5 py-1 font-albert text-[10px] font-bold uppercase tracking-wide text-[#FF6A00]">
              +{selected.length - VISIBLE_BADGE_COUNT}
            </span>
          )}
        </div>
      )}

      {menu}
    </div>
  );
}
