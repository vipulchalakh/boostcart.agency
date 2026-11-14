"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_NAMESPACE } from "@/lib/cal";

/** Loads Cal.com's booking script once for the whole site, so every "Book a call" button opens the pop-up instantly. */
export function CalLoader() {
  useEffect(() => {
    getCalApi({ namespace: CAL_NAMESPACE })
      .then((cal) => cal("ui", { theme: "light", cssVarsPerTheme: { light: { "cal-brand": "#ea3bb0" }, dark: { "cal-brand": "#ea3bb0" } }, hideEventTypeDetails: false, layout: "month_view" }))
      .catch(() => {});
  }, []);
  return null;
}
