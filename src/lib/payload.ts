import "server-only";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import {
  type Brand,
  type Compatible,
  type Fitur,
  type Medan,
  type Product,
  type InfoStripItem,
  type Tipe,
  catalogHero,
  infoStrip,
  infoStripDefaults,
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
  type CtaContent,
  type Story,
} from "./content";
import { getWaUrl } from "./whatsapp";

function extractMediaUrl(media: unknown): string | undefined {
  if (typeof media === "object" && media !== null) {
    const obj = media as { filename?: string; url?: string };
    const rawUrl =
      obj.url || (obj.filename ? `/api/media/file/${obj.filename}` : undefined);
    if (rawUrl) {
      return rawUrl.startsWith("http") || rawUrl.startsWith("/")
        ? rawUrl
        : `/${rawUrl}`;
    }
  } else if (typeof media === "string" && media) {
    return media.startsWith("http") || media.startsWith("/")
      ? media
      : `/${media}`;
  }
  return undefined;
}

function extractMediaInfo(media: unknown): { url?: string; isVideo: boolean } {
  if (typeof media === "object" && media !== null) {
    const obj = media as { filename?: string; url?: string; mimeType?: string };
    const rawUrl =
      obj.url || (obj.filename ? `/api/media/file/${obj.filename}` : undefined);
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
    const url =
      media.startsWith("http") || media.startsWith("/") ? media : `/${media}`;
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
      const waNumber = siteConfig.whatsapp || site.whatsapp;
      const waMsg =
        (siteConfig.whatsappMessage as string) ||
        "Halo SaveMile, saya ingin berkonsultasi mengenai ban armada.";

      const cmsNav = Array.isArray(siteConfig.navItems)
        ? (siteConfig.navItems as Record<string, unknown>[])
            .map((group) => ({
              label: (group.label as string) || "",
              children: Array.isArray(group.children)
                ? (group.children as Record<string, unknown>[]).map(
                    (child) => ({
                      label: (child.label as string) || "",
                      href: (child.href as string) || "",
                      desc: (child.desc as string) || undefined,
                    }),
                  )
                : [],
            }))
            .filter((g) => g.label && g.children.length > 0)
        : undefined;

      return {
        ...site,
        name: siteConfig.name || site.name,
        tagline: siteConfig.tagline || site.tagline,
        blurb: siteConfig.blurb || site.blurb,
        email: siteConfig.email || site.email,
        hrEmail: siteConfig.hrEmail || site.hrEmail,
        phone: siteConfig.phone || site.phone,
        whatsapp: waNumber,
        whatsappMessage: waMsg,
        whatsappUrl: getWaUrl(waNumber, waMsg),
        address: siteConfig.address || site.address,
        nav: cmsNav && cmsNav.length > 0 ? cmsNav : nav,
      };
    }
  } catch {
    // Fallback to static site object
  }
  return {
    ...site,
    whatsappMessage:
      "Halo SaveMile, saya ingin berkonsultasi mengenai ban armada.",
    whatsappUrl: getWaUrl(
      site.whatsapp,
      "Halo SaveMile, saya ingin berkonsultasi mengenai ban armada.",
    ),
    nav,
  };
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
        ? homePage.whyChooseItems.map((item: Record<string, unknown>) => ({
            tag: (item.tag as string) || undefined,
            title: (item.title as string) || undefined,
            highlight:
              typeof item.highlight === "string"
                ? item.highlight
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                : Array.isArray(item.highlight)
                  ? (item.highlight as string[])
                  : undefined,
            body: (item.body as string) || undefined,
            icon:
              (item.icon as "consult" | "laser" | "bell" | "shield") ||
              undefined,
            image: extractMediaUrl(item.image),
          }))
        : undefined;

      const successStories: Story[] = Array.isArray(homePage.successStories)
        ? homePage.successStories
            .map((item: Record<string, unknown>): Story | null => {
              if (typeof item !== "object" || !item) return null;
              const imageUrl = extractMediaUrl(item.image);
              const itemTitle = (item.title as string) || "";
              const computedSlug =
                (item.slug as string) ||
                itemTitle
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");

              return {
                slug: computedSlug || "success-story",
                tag: (item.tag as string) || "",
                title: itemTitle,
                units: (item.units as string) || "",
                description: (item.description as string) || "",
                href:
                  (item.href as string) &&
                  (item.href as string) !== "/insight/success-story"
                    ? (item.href as string)
                    : `/insight/success-story/${computedSlug}`,
                ...(imageUrl ? { image: imageUrl } : {}),
              };
            })
            .filter(
              (item): item is Story => item !== null && Boolean(item.title),
            )
        : [];

      const siteConfig = await getSiteConfigServer();
      const pageWaMsg =
        (homePage.whatsappMessage as string) ||
        "Halo SaveMile, saya ingin berkonsultasi mengenai ban armada.";
      const finalCtaContent: CtaContent = {
        ...finalCta,
        whatsappMessage: pageWaMsg,
        whatsappUrl: getWaUrl(siteConfig.whatsapp, pageWaMsg),
      };

      const coverageStats = Array.isArray(homePage.coverageStats)
        ? homePage.coverageStats
            .map((item: Record<string, unknown>) => ({
              value: String(item.value || ""),
              label: String(item.label || ""),
            }))
            .filter((s: { value: string; label: string }) =>
              Boolean(s.value && s.label),
            )
        : undefined;

      const coverageBranches = Array.isArray(homePage.coverageBranches)
        ? homePage.coverageBranches
            .map((item: Record<string, unknown>) => ({
              city: String(item.city || ""),
              x: typeof item.x === "number" ? item.x : Number(item.x) || 0,
              y: typeof item.y === "number" ? item.y : Number(item.y) || 0,
              types: Array.isArray(item.types)
                ? (item.types as ("service" | "warehouse")[])
                : ["service" as const],
            }))
            .filter((b: { city: string }) => Boolean(b.city))
        : undefined;

      const coverageLocations = coverageBranches
        ? Array.from(
            coverageBranches
              .reduce((map, b) => {
                const cleanCity = b.city.replace(/\s*-\s*(WH|S)$/i, "").trim();
                const existing = map.get(cleanCity) || {
                  city: cleanCity,
                  types: new Set<"service" | "warehouse">(),
                };
                b.types.forEach((t) => {
                  existing.types.add(t);
                });
                map.set(cleanCity, existing);
                return map;
              }, new Map<string, { city: string; types: Set<"service" | "warehouse"> }>())
              .values(),
          ).map((loc) => ({ city: loc.city, types: Array.from(loc.types) }))
        : undefined;

      const coverageData = {
        title: (homePage.coverageTitle as string) || coverage.title,
        accent: (homePage.coverageAccent as string) || coverage.accent,
        body: (homePage.coverageBody as string) || coverage.body,
        stats:
          coverageStats && coverageStats.length > 0
            ? coverageStats
            : coverage.stats,
        branches:
          coverageBranches && coverageBranches.length > 0
            ? coverageBranches
            : coverage.branches,
        locations:
          coverageLocations && coverageLocations.length > 0
            ? coverageLocations
            : coverage.locations,
      };

      const whyChooseTitleHighlightRaw = homePage.whyChooseTitleHighlight;
      const whyChooseTitleHighlight =
        typeof whyChooseTitleHighlightRaw === "string"
          ? whyChooseTitleHighlightRaw
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : undefined;

      return {
        title: homePage.title || undefined,
        heroEyebrow: homePage.heroEyebrow || undefined,
        heroDescription: homePage.heroDescription || hero.description,
        heroImage: heroImage || (heroVideo ? undefined : hero.image),
        heroVideo: heroVideo || undefined,
        whyChooseTitle: homePage.whyChooseTitle || undefined,
        whyChooseTitleHighlight:
          whyChooseTitleHighlight && whyChooseTitleHighlight.length > 0
            ? whyChooseTitleHighlight
            : whyChoose.highlight,
        whyChooseBody: homePage.whyChooseBody || whyChoose.body,
        whyChooseItems:
          whyChooseItems && whyChooseItems.length > 0
            ? whyChooseItems
            : undefined,
        successStories:
          successStories && successStories.length > 0
            ? successStories
            : undefined,
        coverage: coverageData,
        finalCta: finalCtaContent,
      };
    }
  } catch {
    // Fallback to static defaults
  }
  const siteConfig = await getSiteConfigServer();
  const pageWaMsg =
    "Halo SaveMile, saya ingin berkonsultasi mengenai ban armada.";
  return {
    title: undefined,
    heroEyebrow: undefined,
    heroDescription: hero.description,
    heroImage: hero.image,
    heroVideo: undefined,
    whyChooseTitle: undefined,
    whyChooseTitleHighlight: whyChoose.highlight,
    whyChooseBody: whyChoose.body,
    whyChooseItems: undefined,
    successStories: undefined,
    coverage: coverage,
    finalCta: {
      ...finalCta,
      whatsappMessage: pageWaMsg,
      whatsappUrl: getWaUrl(siteConfig.whatsapp, pageWaMsg),
    },
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

      const infoStripItems = Array.isArray(catalogPage.infoStripItems)
        ? catalogPage.infoStripItems.map((item: Record<string, unknown>) => ({
            title: String(item.title || ""),
            sub: String(item.sub || ""),
            icon: String(item.icon || "certificate") as InfoStripItem["icon"],
          }))
        : undefined;

      const siteConfig = await getSiteConfigServer();
      const pageWaMsg =
        (catalogPage.whatsappMessage as string) ||
        "Halo SaveMile, saya ingin bertanya mengenai katalog ban.";
      const consultCtaContent: CtaContent = {
        ...consultCta,
        whatsappMessage: pageWaMsg,
        whatsappUrl: getWaUrl(siteConfig.whatsapp, pageWaMsg),
      };

      return {
        title: catalogPage.title || catalogHero.title,
        heroImage: heroImage || (heroVideo ? undefined : catalogHero.image),
        heroVideo,
        consultCta: consultCtaContent,
        infoStripTitle:
          (catalogPage.infoStripTitle as string) || infoStripDefaults.title,
        infoStripTitleHighlight:
          typeof catalogPage.infoStripTitleHighlight === "string"
            ? catalogPage.infoStripTitleHighlight
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : infoStripDefaults.highlight,
        infoStripItems:
          infoStripItems && infoStripItems.length > 0
            ? infoStripItems
            : infoStrip,
      };
    }
  } catch {
    // Fallback to static defaults
  }
  const siteConfig = await getSiteConfigServer();
  const pageWaMsg = "Halo SaveMile, saya ingin bertanya mengenai katalog ban.";
  return {
    title: catalogHero.title,
    heroImage: catalogHero.image,
    heroVideo: undefined,
    consultCta: {
      ...consultCta,
      whatsappMessage: pageWaMsg,
      whatsappUrl: getWaUrl(siteConfig.whatsapp, pageWaMsg),
    },
    infoStripTitle: infoStripDefaults.title,
    infoStripTitleHighlight: infoStripDefaults.highlight,
    infoStripItems: infoStrip,
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
        ? tmsPage.featureItems.map((item: Record<string, unknown>) => {
            const mInfo = extractMediaInfo(item.media);
            return {
              title: (item.title as string) || "",
              desc: (item.desc as string) || "",
              icon: (item.icon as string) || undefined,
              image: !mInfo.isVideo ? mInfo.url : undefined,
              video: mInfo.isVideo ? mInfo.url : undefined,
            };
          })
        : undefined;

      const featuresHighlightRaw = tmsPage.featuresHighlight;
      const featuresHighlight =
        typeof featuresHighlightRaw === "string"
          ? featuresHighlightRaw
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : undefined;

      const features = {
        title: (tmsPage.featuresTitle as string) || tms.features.title,
        highlight:
          featuresHighlight && featuresHighlight.length > 0
            ? featuresHighlight
            : tms.features.highlight,
        items:
          featureItems && featureItems.length > 0
            ? featureItems
            : tms.features.items,
      };

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
        highlight:
          consultationHighlight && consultationHighlight.length > 0
            ? consultationHighlight
            : undefined,
        description: tmsPage.consultationDescription || undefined,
        image: consultationImage,
        video: consultationVideo,
      };

      const siteConfig = await getSiteConfigServer();
      const pageWaMsg =
        (tmsPage.whatsappMessage as string) ||
        "Halo SaveMile, saya ingin tahu lebih lanjut mengenai Tire Management Solution (TMS).";
      const tmsCtaContent: CtaContent = {
        ...tmsCta,
        whatsappMessage: pageWaMsg,
        whatsappUrl: getWaUrl(siteConfig.whatsapp, pageWaMsg),
      };

      return {
        title: tmsPage.title || "Tire Management Solution",
        heroImage:
          heroImage ||
          (heroVideo ? undefined : "/assets/images/tms-banner.webp"),
        heroVideo,
        features,
        consultation,
        tmsCta: tmsCtaContent,
      };
    }
  } catch {
    // Fallback to defaults
  }
  const siteConfig = await getSiteConfigServer();
  const pageWaMsg =
    "Halo SaveMile, saya ingin tahu lebih lanjut mengenai Tire Management Solution (TMS).";
  return {
    title: "Tire Management Solution",
    heroImage: "/assets/images/tms-banner.webp",
    heroVideo: undefined,
    features: undefined,
    consultation: undefined,
    tmsCta: {
      ...tmsCta,
      whatsappMessage: pageWaMsg,
      whatsappUrl: getWaUrl(siteConfig.whatsapp, pageWaMsg),
    },
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
            .map((item: Record<string, unknown>) =>
              typeof item === "object" && item
                ? String(item.paragraph || "")
                : String(item),
            )
            .filter(Boolean)
        : undefined;

      const storyTitleHighlightRaw = aboutPage.storyTitleHighlight;
      const storyTitleHighlight =
        typeof storyTitleHighlightRaw === "string"
          ? storyTitleHighlightRaw
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : undefined;

      const storyImage =
        extractMediaUrl(aboutPage.storyImage) || about.story.image;

      const trustTitleHighlightRaw = aboutPage.trustTitleHighlight;
      const trustTitleHighlight =
        typeof trustTitleHighlightRaw === "string"
          ? trustTitleHighlightRaw
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : undefined;

      return {
        title:
          aboutPage.title || `${about.hero.titleLead}${about.hero.titleAccent}`,
        heroImage:
          heroImage ||
          (heroVideo ? undefined : "/assets/images/about-banner.webp"),
        heroVideo,
        storyTitle: aboutPage.storyTitle || about.story.title,
        storyTitleHighlight:
          storyTitleHighlight && storyTitleHighlight.length > 0
            ? storyTitleHighlight
            : about.story.highlight,
        storyImage,
        storyBody:
          storyBodyItems && storyBodyItems.length > 0
            ? storyBodyItems
            : about.story.body,
        trustTitle: aboutPage.trustTitle || about.trust.title,
        trustTitleHighlight:
          trustTitleHighlight && trustTitleHighlight.length > 0
            ? trustTitleHighlight
            : about.trust.highlight,
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
    storyTitleHighlight: about.story.highlight,
    storyImage: about.story.image,
    storyBody: about.story.body,
    trustTitle: about.trust.title,
    trustTitleHighlight: about.trust.highlight,
    trustBody: about.trust.body,
  };
}

export async function getCareerPageServer() {
  try {
    const payload = await getPayload({ config: configPromise });
    const careerPage = await payload
      .findGlobal({ slug: "career-page", depth: 2 })
      .catch(() => null);
    if (careerPage) {
      const mediaInfo = extractMediaInfo(careerPage.heroMedia);
      let heroImage: string | undefined;
      let heroVideo: string | undefined;

      if (mediaInfo.url) {
        if (mediaInfo.isVideo) {
          heroVideo = mediaInfo.url;
        } else {
          heroImage = mediaInfo.url;
        }
      }

      const valuesItems = Array.isArray(careerPage.valuesItems)
        ? careerPage.valuesItems.map((item: Record<string, unknown>) => ({
            title: String(item.title || ""),
            desc: String(item.desc || ""),
            icon: String(item.icon || "target"),
          }))
        : undefined;

      return {
        title: careerPage.title || career.hero.eyebrow,
        heroTitle:
          careerPage.heroTitle ||
          `${career.hero.titleLead}${career.hero.titleAccent}`,
        heroDescription: careerPage.heroDescription || career.hero.description,
        heroImage:
          heroImage ||
          (heroVideo ? undefined : "/assets/images/career-banner.webp"),
        heroVideo,
        valuesTitle: careerPage.valuesTitle || career.values.title,
        valuesTitleHighlight:
          careerPage.valuesTitleHighlight || career.values.titleAccent,
        valuesBody: careerPage.valuesBody || career.values.body,
        valuesItems:
          valuesItems && valuesItems.length > 0
            ? valuesItems
            : career.values.items,
        ctaTitle:
          careerPage.ctaTitle ||
          `${career.join.titleLead}${career.join.titleAccent}`,
        ctaTitleHighlight:
          careerPage.ctaTitleHighlight || career.join.titleAccent,
        ctaDescription: careerPage.ctaDescription || career.join.description,
        ctaActionText: careerPage.ctaActionText || career.join.action.label,
        ctaActionUrl: careerPage.ctaActionUrl || career.join.action.href,
      };
    }
  } catch {
    // Fallback to static defaults
  }

  return {
    title: career.hero.eyebrow,
    heroTitle: `${career.hero.titleLead}${career.hero.titleAccent}`,
    heroDescription: career.hero.description,
    heroImage: "/assets/images/career-banner.webp",
    heroVideo: undefined,
    valuesTitle: career.values.title,
    valuesTitleHighlight: career.values.titleAccent,
    valuesBody: career.values.body,
    valuesItems: career.values.items,
    ctaTitle: `${career.join.titleLead}${career.join.titleAccent}`,
    ctaTitleHighlight: career.join.titleAccent,
    ctaDescription: career.join.description,
    ctaActionText: career.join.action.label,
    ctaActionUrl: career.join.action.href,
  };
}

export async function getContactPageServer() {
  try {
    const payload = await getPayload({ config: configPromise });
    const contactPage = await payload
      .findGlobal({ slug: "contact-page", depth: 2 })
      .catch(() => null);
    if (contactPage) {
      const mediaInfo = extractMediaInfo(contactPage.heroMedia);
      let heroImage: string | undefined;
      let heroVideo: string | undefined;

      if (mediaInfo.url) {
        if (mediaInfo.isVideo) {
          heroVideo = mediaInfo.url;
        } else {
          heroImage = mediaInfo.url;
        }
      }

      const siteConfig = await getSiteConfigServer();
      const pageWaMsg =
        (contactPage.whatsappMessage as string) ||
        "Halo SaveMile, saya ingin berkonsultasi mengenai layanan dan produk ban.";

      const helpOptions = Array.isArray(contactPage.helpOptions)
        ? contactPage.helpOptions.map((item: Record<string, unknown>) => {
            const rawIcon = String(item.icon || "whatsapp");
            const rawHref = String(item.href || "");
            const isWa = rawIcon === "whatsapp" || rawHref.includes("wa.me");
            const itemWaMsg = (item.whatsappMessage as string) || pageWaMsg;
            const href = isWa
              ? getWaUrl(rawHref || siteConfig.whatsapp, itemWaMsg)
              : rawHref;

            return {
              title: String(item.title || ""),
              tag: String(item.tag || ""),
              desc: String(item.desc || ""),
              icon: rawIcon,
              actionLabel: String(item.actionLabel || ""),
              href,
              external: Boolean(item.external),
            };
          })
        : undefined;

      const infoItems = Array.isArray(contactPage.infoItems)
        ? contactPage.infoItems.map((item: Record<string, unknown>) => ({
            label: String(item.label || ""),
            value: String(item.value || ""),
            icon: String(item.icon || "pin"),
            href: item.href ? String(item.href) : undefined,
          }))
        : undefined;

      const helpHighlightRaw = contactPage.helpHighlight;
      const helpHighlight =
        typeof helpHighlightRaw === "string"
          ? helpHighlightRaw
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : undefined;

      const fallbackHelpOptions = contact.help.options.map((o) => {
        if (o.icon === "whatsapp" || o.href.includes("wa.me")) {
          return {
            ...o,
            href: getWaUrl(siteConfig.whatsapp, pageWaMsg),
          };
        }
        return o;
      });

      return {
        title: contactPage.title || contact.hero.eyebrow,
        heroTitle:
          contactPage.heroTitle ||
          `${contact.hero.titleLead}${contact.hero.titleAccent}`,
        heroDescription:
          contactPage.heroDescription || contact.hero.description,
        heroImage:
          heroImage ||
          (heroVideo ? undefined : "/assets/images/contact-banner.webp"),
        heroVideo,
        helpTitle: contactPage.helpTitle || contact.help.title,
        helpHighlight:
          helpHighlight && helpHighlight.length > 0
            ? helpHighlight
            : contact.help.highlight,
        helpBody: contactPage.helpBody || contact.help.body,
        helpOptions:
          helpOptions && helpOptions.length > 0
            ? helpOptions
            : fallbackHelpOptions,
        infoItems: infoItems && infoItems.length > 0 ? infoItems : contact.info,
      };
    }
  } catch {
    // Fallback to static defaults
  }

  const defaultWaUrl = getWaUrl(
    site.whatsapp,
    "Halo SaveMile, saya ingin berkonsultasi mengenai layanan dan produk ban.",
  );
  const fallbackHelpOptions = contact.help.options.map((o) => {
    if (o.icon === "whatsapp" || o.href.includes("wa.me")) {
      return { ...o, href: defaultWaUrl };
    }
    return o;
  });

  return {
    title: contact.hero.eyebrow,
    heroTitle: `${contact.hero.titleLead}${contact.hero.titleAccent}`,
    heroDescription: contact.hero.description,
    heroImage: "/assets/images/contact-banner.webp",
    heroVideo: undefined,
    helpTitle: contact.help.title,
    helpHighlight: contact.help.highlight,
    helpBody: contact.help.body,
    helpOptions: fallbackHelpOptions,
    infoItems: contact.info,
  };
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description?: string;
  applyUrl?: string;
}

export async function getJobsServer(): Promise<JobListing[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "jobs",
      where: {
        isActive: {
          equals: true,
        },
      },
      limit: 100,
    });

    if (docs && docs.length > 0) {
      return docs.map((doc) => ({
        id: String(doc.id),
        title: doc.title || "",
        department: doc.department || "",
        location: doc.location || "",
        type: doc.type || "Full-time",
        description: doc.description || undefined,
        applyUrl: doc.applyUrl || undefined,
      }));
    }
  } catch {
    // Fallback
  }
  return [];
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
            doc.logo.url ||
            (doc.logo.filename
              ? `/api/media/file/${doc.logo.filename}`
              : undefined);
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
  slug?: string;
  tag?: string;
  title?: string;
  units?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  body?: Array<{ paragraph?: string } | string>;
  metrics?: Array<{ label?: string; value?: string }>;
  href?: string;
  image?: { filename?: string; url?: string } | string | number | null;
}

export async function getSuccessStoryPageServer() {
  const fallback = {
    title: "Success Story",
    seoDescription:
      "Cerita nyata armada yang berhenti menebak dan mulai mengelola ban berbasis data bersama SaveMile.",
    heroEyebrow: successStory.eyebrow,
    heroTitleLead: "Terbukti di ",
    heroTitleAccent: successStory.accent,
    heroDescription:
      "Hasil nyata dari armada yang berhenti menebak dan mulai mengelola ban berbasis data.",
    heroImage: "/assets/images/success-story-banner.webp" as string | undefined,
    heroVideo: undefined as string | undefined,
  };

  try {
    const payload = await getPayload({ config: configPromise });
    const page = await payload
      .findGlobal({ slug: "success-story-page", depth: 2 })
      .catch(() => null);

    if (!page) return fallback;

    const mediaInfo = extractMediaInfo(page.heroMedia);
    let heroImage: string | undefined;
    let heroVideo: string | undefined;
    if (mediaInfo.url) {
      if (mediaInfo.isVideo) {
        heroVideo = mediaInfo.url;
      } else {
        heroImage = mediaInfo.url;
      }
    }

    return {
      title: page.title || fallback.title,
      seoDescription: page.seoDescription || fallback.seoDescription,
      heroEyebrow: page.heroEyebrow || fallback.heroEyebrow,
      heroTitleLead: page.heroTitleLead || fallback.heroTitleLead,
      heroTitleAccent: page.heroTitleAccent || fallback.heroTitleAccent,
      heroDescription: page.heroDescription || fallback.heroDescription,
      heroImage: heroImage || (heroVideo ? undefined : fallback.heroImage),
      heroVideo,
    };
  } catch (error) {
    console.error("Error fetching success story page:", error);
    return fallback;
  }
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
            doc.image.url ||
            (doc.image.filename
              ? `/api/media/file/${doc.image.filename}`
              : undefined);
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

        const computedSlug =
          doc.slug ||
          (doc.title
            ? doc.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
            : String(doc.id));

        const staticMatch = successStory.items.find(
          (s) =>
            s.slug === computedSlug ||
            (doc.title && s.title.toLowerCase() === doc.title.toLowerCase()),
        );

        if (!imageUrl && staticMatch) {
          imageUrl = staticMatch.image;
        }

        const bodyArray = Array.isArray(doc.body)
          ? doc.body
              .map((b) =>
                typeof b === "object" && b ? b.paragraph || "" : String(b),
              )
              .filter(Boolean)
          : staticMatch?.body;

        const metricsArray = Array.isArray(doc.metrics)
          ? doc.metrics
              .map((m) => ({
                label: m.label || "",
                value: m.value || "",
              }))
              .filter((m) => Boolean(m.label && m.value))
          : staticMatch?.metrics;

        const href =
          doc.href && doc.href !== "/insight/success-story"
            ? doc.href
            : `/insight/success-story/${computedSlug}`;

        return {
          slug: computedSlug,
          tag: doc.tag || staticMatch?.tag || "",
          title: doc.title || staticMatch?.title || "",
          units: doc.units || staticMatch?.units || "",
          description: doc.description || staticMatch?.description || "",
          challenge: doc.challenge || staticMatch?.challenge,
          solution: doc.solution || staticMatch?.solution,
          body: bodyArray,
          metrics: metricsArray,
          href,
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

export async function getSuccessStoryBySlugServer(
  slug: string,
): Promise<Story | undefined> {
  const stories = await getSuccessStoriesServer();
  return stories.find((s) => s.slug === slug || s.href.endsWith(`/${slug}`));
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
            doc.image.url ||
            (doc.image.filename
              ? `/api/media/file/${doc.image.filename}`
              : undefined);
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
            imageUrl = `/api/media/file/${doc.image}`;
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
