"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type TouchEvent } from "react";
import { useMediaQuery } from "./use-media-query";

const subscribeVisibility = (notify: () => void) => {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
};

export function useCarousel(count: number, autoplay = false) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)", true);
  const visible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState !== "hidden", () => true);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const running = autoplay && count > 1 && !paused && !hovered && !reduced && visible;
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), 6000);
    return () => window.clearInterval(timer);
  }, [count, running]);
  const go = (value: number) => { setIndex((value + count) % count); setPaused(true); };
  return {
    index, paused, reduced, running, setPaused,
    go, next: () => go(index + 1), previous: () => go(index - 1),
    bindings: {
      onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false),
      onFocusCapture: () => setPaused(true),
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "ArrowRight") { event.preventDefault(); go(index + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); go(index - 1); }
        if (event.key === "Home") { event.preventDefault(); go(0); }
        if (event.key === "End") { event.preventDefault(); go(count - 1); }
      },
      onTouchStart: (event: TouchEvent<HTMLElement>) => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; },
      onTouchEnd: (event: TouchEvent<HTMLElement>) => {
        if (!touch.current) return;
        const dx = event.changedTouches[0].clientX - touch.current.x;
        const dy = event.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
        touch.current = null;
      },
    },
  };
}
