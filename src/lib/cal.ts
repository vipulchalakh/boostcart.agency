/** Cal.com booking pop-up shared by every "Book a call" button on the site. */
export const CAL_NAMESPACE = "30min";
export const CAL_LINK = "boostcart-agency-wavkho/30min";

/** Spread onto any element: Cal's script opens the booking pop-up when it is clicked. */
export const calAttrs = {
  "data-cal-namespace": CAL_NAMESPACE,
  "data-cal-link": CAL_LINK,
  "data-cal-config": JSON.stringify({ layout: "month_view", theme: "light", useSlotsViewOnSmallScreen: "true" }),
};
