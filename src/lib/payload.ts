import "server-only";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import {
  type Brand,
  type Compatible,
  type Fitur,
  type Medan,
  type Product,
  type Tipe,
  catalogHero,
  products,
} from "./catalog";
import {
  about,
  career,
  clients,
  consultCta,
  contact,
  coverage,
  finalCta,
  footerColumns,
  hero,
  nav,
  site,
  stats,
  successStory,
  tms,
  tmsCta,
  whyChoose,
  type Story,
} from "./content";

function extractMediaUrl(media: unknown): string | undefined {
  if (typeof media === "object" && media !== null) {
    const obj = media as { filename?: string; url?: string };
    const rawUrl = (obj.filename ? `/uploads/${obj.filename}` : undefined) || obj.url;
    if (rawUrl) {
      return rawUrl.startsWith("http") || rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
    }
  } else if (typeof media === "string" && media) {
    return media.startsWith("http") || media.startsWith("/") ? media : `/${media}`;
  }
  return undefined;
}

function extractMediaInfo(media: unknown): { url?: string; isVideo: boolean } {
  if (typeof media === "object" && media !== null) {
    const obj = media as { filename?: string; url?: string; mimeType?: string };
    const rawUrl = (obj.filename ? `/uploads/${obj.filename}` : undefined) || obj.url;
    const url = rawUrl
      ? rawUrl.startsWith("http") || rawUrl.startsWith("/")
        ? rawUrl
        : `/${rawUrl}`
      : undefined;

    const mime = obj.mimeType || "";
    const isVideo =
      mime.startsWith("video/") ||
      Boolean(rawUrl && /\.(mp4|webm|ogg|mov|m4v)$/i.test(rawUrl));

    return { url, isVideo };
  } else if (typeof media === "string" && media) {
    const url = media.startsWith("http") || media.startsWith("/") ? media : `/${media}`;
    const isVideo = Boolean(/\.(mp4|webm|ogg|mov|m4v)$/i.test(media));
    return { url, isVideo };
  }
  return { url: undefined, isVideo: false };
}

export async function getSiteConfigServer() {
  try {
    const payload = await getPayload({ config: configPromise });
    const siteConfig = await payload
      .findGlobal({ slug: "site-config" })
      .catch(() => null);
    if (siteConfig) {
      return {
        ...site,
        name: siteConfig.name || site.name,
        tagline: siteConfig.tagline || site.tagline,
        blurb: siteConfig.blurb || site.blurb,
        email: siteConfig.email || site.email,
        hrEmail: siteConfig.hrEmail || site.hrEmail,
        phone: siteConfig.phone || site.phone,
        whatsapp: siteConfig.whatsapp || site.whatsapp,
        address: siteConfig.address || site.address,
      };
    }
  } catch {
    // Fallback to static site object
  }
  return site;
}

export async function getHomePageServer() {
  try {
    const payload = await getPayload({ config: configPromise });
    const homePage = await payload
      .findGlobal({ slug: "home-page", depth: 2 })
      .catch(() => null);
    if (homePage) {
      const mediaInfo = extractMediaInfo(homePage.heroMedia);
      let heroImage: string | undefined;
      let heroVideo: string | undefined;

      if (mediaInfo.url) {
        if (mediaInfo.isVideo) {
          heroVideo = mediaInfo.url;
        } else {
          heroImage = mediaInfo.url;
        }
      }

      if (!heroImage && !heroVideo) {
        heroImage = extractMediaUrl(homePage.heroImage);
        heroVideo = extractMediaUrl(homePage.heroVideo);
      }

      const whyChooseItems = Array.isArray(homePage.whyChooseItems)
        ? homePage.whyChooseItems.map((item: any) => ({
            tag: item.tag || undefined,
            title: item.title || undefined,
            highlight: typeof item.highlight === "string"
              ? item.highlight.split(",").map((s: string) => s.trim()).filter(Boolean)
              : Array.isArray(item.highlight)
              ? item.highlight
              : undefined,
            body: item.body || undefined,
            icon: item.icon || undefined,
            image: extractMediaUrl(item.image),
          }))
        : undefined;

      const successStories: Story[] = Array.isArray(homePage.successStories)
        ? homePage.successStories
            .map((item: any): Story | null => {
              if (typeof item !== "object" || !item) return null;
              const imageUrl = extractMediaUrl(item.image);
              return {
                tag: item.tag || "",
                title: item.title || "",
                units: item.units || "",
                description: item.description || "",
                href: item.href || "/insight/success-story",
                ...(imageUrl ? { image: imageUrl } : {}),
              };
            })
            .filter((item): item is Story => item !== null && Boolean(item.title))
        : [];

      return {
        title: homePage.title || undefined,
        heroEyebrow: homePage.heroEyebrow || undefined,
        heroDescription: homePage.heroDescription || hero.description,
        heroImage: heroImage || (heroVideo ? undefined : hero.image),
        heroVideo: heroVideo || undefined,
        whyChooseTitle: homePage.whyChooseTitle || undefined,
        whyChooseBody: homePage.whyChooseBody || whyChoose.body,
        whyChooseItems: whyChooseItems && whyChooseItems.length > 0 ? whyChooseItems : undefined,
        successStories: successStories && successStories.length > 0 ? successStories : undefined,
      };
    }
  } catch {
    // Fallback to static defaults
  }
  return {
    title: undefined,
    heroEyebrow: undefined,
    heroDescription: hero.description,
    heroImage: hero.image,
    heroVideo: undefined,
    whyChooseTitle: undefined,
    whyChooseBody: whyChoose.body,
    whyChooseItems: undefined,
    successStories: undefined,
  };
}

export async function getCatalogPageServer() {
  try {
    const payload = await getPayload({ config: configPromise });
    const catalogPage = await payload
      .findGlobal({ slug: "catalog-page", depth: 2 })
      .catch(() => null);
    if (catalogPage) {
      const mediaInfo = extractMediaInfo(catalogPage.heroMedia);
      let heroImage: string | undefined;
      let heroVideo: string | undefined;

      if (mediaInfo.url) {
        if (mediaInfo.isVideo) {
          heroVideo = mediaInfo.url;
        } else {
          heroImage = mediaInfo.url;
        }
      }

      if (!heroImage && !heroVideo) {
        heroImage = extractMediaUrl(catalogPage.heroImage);
      }

      return {
        eyebrow: catalogPage.eyebrow || catalogHero.eyebrow,
        title: catalogPage.title || catalogHero.title,
        description: catalogPage.description || catalogHero.description,
        heroImage: heroImage || (heroVideo ? undefined : catalogHero.image),
        heroVideo,
      };
    }
  } catch {
    // Fallback to static defaults
  }
  return {
    eyebrow: catalogHero.eyebrow,
    title: catalogHero.title,
    description: catalogHero.description,
    heroImage: catalogHero.image,
    heroVideo: undefined,
  };
}

export async function getTmsPageServer() {
  try {
    const payload = await getPayload({ config: configPromise });
    const tmsPage = await payload
      .findGlobal({ slug: "tms-page", depth: 2 })
      .catch(() => null);
    if (tmsPage) {
      const mediaInfo = extractMediaInfo(tmsPage.heroMedia);
      let heroImage: string | undefined;
      let heroVideo: string | undefined;

      if (mediaInfo.url) {
        if (mediaInfo.isVideo) {
          heroVideo = mediaInfo.url;
        } else {
          heroImage = mediaInfo.url;
        }
      }

      const featureItems = Array.isArray(tmsPage.featureItems)
        ? tmsPage.featureItems.map((item: any) => {
            const mInfo = extractMediaInfo(item.media);
            return {
              title: item.title || "",
              desc: item.desc || "",
              image: !mInfo.isVideo ? mInfo.url : undefined,
              video: mInfo.isVideo ? mInfo.url : undefined,
            };
          })
        : undefined;

      const features = featureItems && featureItems.length > 0
        ? {
            titleLead: tmsPage.featuresTitle || tms.features.titleLead + tms.features.titleAccent,
            items: featureItems,
          }
        : undefined;

      const consultMediaInfo = extractMediaInfo(tmsPage.consultationMedia);
      let consultationImage: string | undefined;
      let consultationVideo: string | undefined;
      if (consultMediaInfo.url) {
        if (consultMediaInfo.isVideo) {
          consultationVideo = consultMediaInfo.url;
        } else {
          consultationImage = consultMediaInfo.url;
        }
      }

      const consultationHighlightRaw = tmsPage.consultationHighlight;
      const consultationHighlight =
        typeof consultationHighlightRaw === "string"
          ? consultationHighlightRaw
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : undefined;

      const consultation = {
        title: tmsPage.consultationTitle || undefined,
        highlight: consultationHighlight && consultationHighlight.length > 0 ? consultationHighlight : undefined,
        description: tmsPage.consultationDescription || undefined,
        image: consultationImage,
        video: consultationVideo,
      };

      return {
        title: tmsPage.title || "Tire Management Solution",
        heroImage: heroImage || (heroVideo ? undefined : "/assets/images/tms-banner.webp"),
        heroVideo,
        features,
        consultation,
      };
    }
  } catch {
    // Fallback to defaults
  }
  return {
    title: "Tire Management Solution",
    heroImage: "/assets/images/tms-banner.webp",
    heroVideo: undefined,
    features: undefined,
    consultation: undefined,
  };
}

export async function getAboutPageServer() {
  try {
    const payload = await getPayload({ config: configPromise });
    const aboutPage = await payload
      .findGlobal({ slug: "about-page", depth: 2 })
      .catch(() => null);
    if (aboutPage) {
      const mediaInfo = extractMediaInfo(aboutPage.heroMedia);
      let heroImage: string | undefined;
      let heroVideo: string | undefined;

      if (mediaInfo.url) {
        if (mediaInfo.isVideo) {
          heroVideo = mediaInfo.url;
        } else {
          heroImage = mediaInfo.url;
        }
      }

      const storyBodyItems = Array.isArray(aboutPage.storyBody)
        ? aboutPage.storyBody
            .map((item: any) =>
              typeof item === "object" && item ? item.paragraph : String(item),
            )
            .filter(Boolean)
        : undefined;

      return {
        title: aboutPage.title || `${about.hero.titleLead}${about.hero.titleAccent}`,
        heroImage: heroImage || (heroVideo ? undefined : "/assets/images/about-banner.webp"),
        heroVideo,
        storyTitle: aboutPage.storyTitle || about.story.title,
        storyBody: storyBodyItems && storyBodyItems.length > 0 ? storyBodyItems : about.story.body,
        trustTitle: aboutPage.trustTitle || about.trust.title,
        trustBody: aboutPage.trustBody || about.trust.body,
      };
    }
  } catch {
    // Fallback to static defaults
  }
  return {
    title: `${about.hero.titleLead}${about.hero.titleAccent}`,
    heroImage: "/assets/images/about-banner.webp",
    heroVideo: undefined,
    storyTitle: about.story.title,
    storyBody: about.story.body,
    trustTitle: about.trust.title,
    trustBody: about.trust.body,
  };
}

interface PayloadClientDoc {
  id?: string | number;
  name?: string;
  logoUrl?: string;
  logo?: { filename?: string; url?: string } | string | number | null;
  [key: string]: unknown;
}

export async function getClientsServer() {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "clients",
      depth: 2,
      limit: 100,
      sort: "order",
    });

    if (docs && docs.length > 0) {
      const mappedLogos = docs.map((doc: PayloadClientDoc) => {
        let imageUrl: string | undefined;

        if (doc.logo && typeof doc.logo === "object" && doc.logo !== null) {
          const rawUrl =
            (doc.logo.filename ? `/uploads/${doc.logo.filename}` : undefined) ||
            doc.logo.url;
          if (rawUrl) {
            imageUrl =
              rawUrl.startsWith("http") || rawUrl.startsWith("/")
                ? rawUrl
                : `/${rawUrl}`;
          }
        }

        if (!imageUrl && doc.logoUrl) {
          imageUrl = doc.logoUrl;
        }

        if (!imageUrl) {
          const staticMatch = clients.logos.find(
            (l) =>
              typeof l !== "string" &&
              doc.name &&
              l.name.toLowerCase() === doc.name.toLowerCase(),
          );
          if (staticMatch && typeof staticMatch !== "string") {
            imageUrl = staticMatch.src;
          }
        }

        return {
          name: doc.name || "",
          src: imageUrl || "",
        };
      });

      if (mappedLogos.length > 0) {
        return {
          ...clients,
          logos: mappedLogos,
        };
      }
    }
  } catch {
    // Fallback to static clients content if DB unseeded or error
  }

  return clients;
}

interface PayloadStoryDoc {
  id: string | number;
  tag?: string;
  title?: string;
  units?: string;
  description?: string;
  href?: string;
  image?: { filename?: string; url?: string } | string | number | null;
}

export async function getSuccessStoriesServer(): Promise<Story[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "success-stories",
      depth: 2,
      limit: 100,
    });

    if (docs && docs.length > 0) {
      const mappedStories = docs.map((doc: PayloadStoryDoc) => {
        let imageUrl: string | undefined;

        if (doc.image && typeof doc.image === "object" && doc.image !== null) {
          const rawUrl =
            (doc.image.filename
              ? `/uploads/${doc.image.filename}`
              : undefined) || doc.image.url;
          if (rawUrl) {
            imageUrl =
              rawUrl.startsWith("http") || rawUrl.startsWith("/")
                ? rawUrl
                : `/${rawUrl}`;
          }
        } else if (typeof doc.image === "string" && doc.image) {
          imageUrl =
            doc.image.startsWith("http") || doc.image.startsWith("/")
              ? doc.image
              : `/${doc.image}`;
        }

        if (!imageUrl) {
          const staticMatch = successStory.items.find(
            (s) =>
              doc.title && s.title.toLowerCase() === doc.title.toLowerCase(),
          );
          if (staticMatch) {
            imageUrl = staticMatch.image;
          }
        }

        return {
          tag: doc.tag || "",
          title: doc.title || "",
          units: doc.units || "",
          description: doc.description || "",
          href: doc.href || "/insight/success-story",
          image: imageUrl,
        };
      });

      if (mappedStories.length > 0) {
        return mappedStories;
      }
    }
  } catch {
    // Fallback to static success story content if DB unseeded or error
  }

  return successStory.items;
}

export async function getContentDataServer() {
  try {
    const payload = await getPayload({ config: configPromise });
    const siteConfig = await payload
      .findGlobal({ slug: "site-config" })
      .catch(() => null);
    const clientsData = await getClientsServer();
    const successStoriesData = await getSuccessStoriesServer();

    if (siteConfig) {
      return {
        site: {
          ...site,
          name: siteConfig.name || site.name,
          tagline: siteConfig.tagline || site.tagline,
          blurb: siteConfig.blurb || site.blurb,
          email: siteConfig.email || site.email,
          hrEmail: siteConfig.hrEmail || site.hrEmail,
          phone: siteConfig.phone || site.phone,
          whatsapp: siteConfig.whatsapp || site.whatsapp,
          address: siteConfig.address || site.address,
        },
        nav,
        hero,
        clients: clientsData,
        stats,
        whyChoose,
        coverage,
        successStory: {
          ...successStory,
          items: successStoriesData,
        },
        finalCta,
        consultCta,
        tms,
        tmsCta,
        about,
        career,
        contact,
        footerColumns,
      };
    }
  } catch {
    // Fallback to static exports if DB unseeded or server-side error
  }

  const clientsData = await getClientsServer();
  const successStoriesData = await getSuccessStoriesServer();

  return {
    site,
    nav,
    hero,
    clients: clientsData,
    stats,
    whyChoose,
    coverage,
    successStory: {
      ...successStory,
      items: successStoriesData,
    },
    finalCta,
    consultCta,
    tms,
    tmsCta,
    about,
    career,
    contact,
    footerColumns,
  };
}

interface PayloadProductDoc {
  id: string | number;
  name?: string;
  brand?: { slug?: string; name?: string } | string | null;
  brandChip?: string;
  tipe?: string;
  compatible?: Compatible[];
  medan?: Medan[];
  fitur?: Fitur[];
  sizes?: Array<{ size?: string } | string>;
  description?: string;
  image?: { filename?: string; url?: string } | string | null;
}

export async function getCatalogProductsServer(): Promise<Product[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "products",
      depth: 2,
      limit: 500,
    });

    if (docs && docs.length > 0) {
      return docs.map((doc: PayloadProductDoc) => {
        const brandObj =
          typeof doc.brand === "object" && doc.brand !== null
            ? doc.brand
            : null;
        const brandSlug =
          brandObj?.slug ||
          (typeof doc.brand === "string" ? doc.brand : "tiron");
        const brandName =
          brandObj?.name ||
          (brandSlug === "tiron"
            ? "Tiron"
            : brandSlug === "doublestar"
              ? "Doublestar"
              : brandSlug);
        const prodId = doc.name
          ? doc.name.toLowerCase().replace(/\s+/g, "-")
          : String(doc.id);
        const staticMatch = products.find(
          (p) =>
            p.id === prodId || p.name.toLowerCase() === doc.name?.toLowerCase(),
        );

        let imageUrl: string | undefined;
        if (typeof doc.image === "object" && doc.image !== null) {
          const rawUrl =
            (doc.image.filename
              ? `/uploads/${doc.image.filename}`
              : undefined) || doc.image.url;
          if (rawUrl) {
            imageUrl =
              rawUrl.startsWith("http") || rawUrl.startsWith("/")
                ? rawUrl
                : `/${rawUrl}`;
          }
        } else if (typeof doc.image === "string" && doc.image) {
          if (doc.image.startsWith("/") || doc.image.startsWith("http")) {
            imageUrl = doc.image;
          } else if (doc.image.includes(".")) {
            imageUrl = `/uploads/${doc.image}`;
          }
        }

        if (!imageUrl && staticMatch?.image) {
          imageUrl = staticMatch.image;
        }

        return {
          id: prodId,
          brand: brandSlug as Brand,
          brandChip: doc.brandChip || brandName,
          name: doc.name || "",
          tipe: doc.tipe as Tipe,
          compatible: (doc.compatible || []) as Compatible[],
          medan: (doc.medan || []) as Medan[],
          fitur: (doc.fitur || []) as Fitur[],
          sizes: (doc.sizes || []).map((s: { size?: string } | string) =>
            typeof s === "object" && s !== null ? s.size || "" : String(s),
          ),
          description: doc.description || "",
          image: imageUrl,
        };
      });
    }
  } catch {
    // Fallback to static products if DB unseeded
  }

  return products;
}

export async function getProductByIdServer(
  id: string,
): Promise<Product | undefined> {
  const allProducts = await getCatalogProductsServer();
  return allProducts.find(
    (p) =>
      p.id === id ||
      p.name.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase(),
  );
}
