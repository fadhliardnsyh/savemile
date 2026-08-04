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
