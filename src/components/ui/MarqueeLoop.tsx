"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const subscribe = () => () => {};

type Props = { children: ReactNode; className?: string; duration: string; label: string; reverse?: boolean; /** Let visitors grab and drag the track. Auto-slide continues from wherever they leave it. */ draggable?: boolean };

/**
 * Seamless looping track. The server HTML carries the items exactly once (clean content for crawlers and
 * LLMs); the looping copy is added after hydration as an inert, aria-hidden duplicate, and the animation
 * only starts then.
 *
 * With `draggable`, the CSS animation is replaced by a requestAnimationFrame loop so the same slow slide can
 * be grabbed with the pointer (mouse, pen or touch) and flicked with momentum. Under reduced motion it stays a
 * natively scrollable row.
 */
export function MarqueeLoop({ children, className, duration, label, reverse, draggable }: Props) {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const js = Boolean(draggable);

  useEffect(() => {
    const el = box.current;
    const tr = track.current;
    if (!js || !ready || !el || !tr) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seconds = parseFloat(duration) || 40;
    const dir = reverse ? 1 : -1;
    let x = 0; // current offset, kept within (-half, 0]
    let vel = 0; // px/ms flick velocity
    let dragging = false;
    let moved = 0;
    let hover = false;
    let startX = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    let last = performance.now();
    let raf = 0;
    const half = () => tr.scrollWidth / 2;
    const wrap = (v: number) => { const h = half(); return h > 0 ? ((v % h) - h) % h : 0; };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (!dragging) {
        if (Math.abs(vel) > 0.01) {
          x += vel * dt;
          vel *= Math.pow(0.0015, dt / 1000); // glide to a stop
        } else if (!hover && !el.matches(":focus-within")) {
          x += (dir * half() / (seconds * 1000)) * dt;
        }
      }
      x = wrap(x);
      tr.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      moved = 0;
      vel = 0;
      startX = lastX = e.clientX;
      startOffset = x;
      lastT = performance.now();
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      x = startOffset + dx;
      const now = performance.now();
      const dt = now - lastT;
      if (dt > 0) vel = vel * 0.6 + ((e.clientX - lastX) / dt) * 0.4;
      lastX = e.clientX;
      lastT = now;
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (performance.now() - lastT > 80) vel = 0; // held still before release: no flick
      vel = Math.max(Math.min(vel, 3), -3);
      el.classList.remove("is-dragging");
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    // A drag must not count as a click on the card underneath.
    const click = (e: MouseEvent) => { if (moved > 5) { e.preventDefault(); e.stopPropagation(); moved = 0; } };
    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") hover = true; };
    const leave = () => { hover = false; };
    const dragstart = (e: Event) => e.preventDefault();

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("dragstart", dragstart);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("dragstart", dragstart);
      tr.style.transform = "";
    };
  }, [js, ready, duration, reverse]);

  return (
    <div ref={box} className={cn("marquee marquee-scroll marquee-mask overflow-hidden", js && "marquee-drag", className)} role="group" aria-label={label}>
      <div ref={track} className={cn("marquee-track flex w-max will-change-transform", ready && !js && (reverse ? "animate-marquee-reverse" : "animate-marquee"))} style={js ? undefined : { animationDuration: duration }}>
        {children}
        {ready && (
          <div aria-hidden inert className="flex shrink-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
