import { createFileRoute } from "@tanstack/react-router";
import { ContentView, getPage } from "@/components/content-view";
const path = "/marriage/relationships";
export const Route = createFileRoute("/marriage/relationships")({
  head: () => {
    const page = getPage(path);
    const title = (page?.title || "Spouzy") + " | Spouzy";
    const description = page?.description.slice(0,155) || "Explore Spouzy resources.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: path }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: path }] };
  },
  component: () => <ContentView path={path} />,
});
