import { createFileRoute } from "@tanstack/react-router";
import { LocationsHub } from "@/components/location-view";

const title = "Counselling Near You | Mumbai Region & Gujarat | Spouzy";
const description = "Find confidential marriage and relationship counselling in Mumbai, Thane, Navi Mumbai, Ahmedabad, Surat, Vadodara, Rajkot and Gandhinagar.";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LocationsHub,
});
