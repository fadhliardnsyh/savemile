import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SuccessStoryDetail } from "@/components/sections/SuccessStoryDetail";
import {
  getSuccessStoriesServer,
  getSuccessStoryBySlugServer,
  getSiteConfigServer,
} from "@/lib/payload";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getSuccessStoryBySlugServer(slug);

  if (!story) {
    return {
      title: "Success Story Not Found",
    };
  }

  return {
    title: `${story.title} | SaveMile Success Story`,
    description: story.description,
  };
}

export async function generateStaticParams() {
  const stories = await getSuccessStoriesServer();
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function SuccessStoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const [story, allStories, siteConfig] = await Promise.all([
    getSuccessStoryBySlugServer(slug),
    getSuccessStoriesServer(),
    getSiteConfigServer(),
  ]);

  if (!story) {
    notFound();
  }

  const otherStories = allStories.filter((s) => s.slug !== story.slug);

  return (
    <>
      <Navbar items={siteConfig.nav} overHero />
      <main className="relative z-10 flex-1 bg-background">
        <SuccessStoryDetail
          story={story}
          otherStories={otherStories}
          whatsappUrl={siteConfig.whatsappUrl}
        />
      </main>
      <Footer />
    </>
  );
}
