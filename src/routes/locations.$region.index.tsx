import { createFileRoute, notFound } from "@tanstack/react-router";
import { RegionView } from "@/components/location-view";
import { getRegion } from "@/lib/locations";

export const Route = createFileRoute("/locations/$region/")({
  loader: ({ params }) => {
    const region = getRegion(params.region);
    if (!region) throw notFound();
    return { slug: region.slug };
  },
  head: ({ loaderData }) => {
    const region = loaderData ? getRegion(loaderData.slug) : undefined;
    if (!region) return { meta: [{ title: "Not found | Spouzy" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: region.title }, { name: "description", content: region.description },
        { property: "og:title", content: region.title }, { property: "og:description", content: region.description },
        { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: RegionPage,
});

function RegionPage() {
  const { slug } = Route.useLoaderData();
  return <RegionView region={getRegion(slug)!} />;
}
