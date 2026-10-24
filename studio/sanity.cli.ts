import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "n8t179ul", dataset: "production" },
  studioHost: "boostcart-agency",
  deployment: { appId: "rf6saywwacz7106y6zvaetoz" },
  typegen: {
    path: "../src/**/*.{ts,tsx}",
    schema: "../src/sanity/extract.json",
    generates: "../src/sanity/types.ts",
  },
});
