import { createFileRoute, notFound } from "@tanstack/react-router";
import { CityView } from "@/components/location-view";
import { getCity } from "@/lib/locations";

export const Route = createFileRoute("/locations/$region/$city")({
  loader: ({ params }) => {
    const city = getCity(params.region, params.city);
    if (!city) throw notFound();
    return { region: city.region, slug: city.slug };
  },
  head: ({ loaderData }) => {
    const city = loaderData ? getCity(loaderData.region, loaderData.slug) : undefined;
    if (!city) return { meta: [{ title: "Not found | Spouzy" }, { name: "robots", content: "noindex" }] };
    const title = `Marriage & Relationship Counselling in ${city.name} | Spouzy`;
    const description = city.intro.slice(0, 155);
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: CityPage,
});

function CityPage() {
  const { region, slug } = Route.useLoaderData();
  return <CityView city={getCity(region, slug)!} />;
}
