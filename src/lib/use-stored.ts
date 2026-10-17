"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "bc-storage";
const memory = new Map<string, string>(); // fallback when storage is blocked (private windows, etc.)

function read(kind: "local" | "session", key: string): string | null {
  try {
    const s = kind === "local" ? localStorage : sessionStorage;
    return s.getItem(key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null;
  }
}

/** Reads a browser-storage string without hydration mismatches. `undefined` on the server/first render. */
export function useStored(kind: "local" | "session", key: string) {
  const value = useSyncExternalStore(
    (cb) => {
      window.addEventListener(EVENT, cb);
      window.addEventListener("storage", cb);
      return () => {
        window.removeEventListener(EVENT, cb);
        window.removeEventListener("storage", cb);
      };
    },
    () => read(kind, key),
    () => undefined,
  );
  const set = useCallback(
    (v: string) => {
      memory.set(key, v);
      try {
        (kind === "local" ? localStorage : sessionStorage).setItem(key, v);
      } catch {}
      window.dispatchEvent(new Event(EVENT));
    },
    [kind, key],
  );
  return [value, set] as const;
}
