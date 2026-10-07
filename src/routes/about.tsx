import { createFileRoute } from "@tanstack/react-router";
import { AboutPage, pageMeta } from "@/components/content-pages";

/* Spiritual Guide Image */
import spiritualGuide from "@/assets/spiritual-guide.png";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About the Peetham",
      "Learn about Sri Lalitha Tripura Sundari Peetham, our mission and spiritual approach."
    ),

  component: AboutRoute,
});

function AboutRoute() {
  return (
    <AboutPage
      spiritualGuideImage={spiritualGuide}
    />
  );
}