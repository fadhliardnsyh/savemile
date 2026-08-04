import Module from "node:module";

type ModuleWithRequire = {
  require: (this: unknown, ...args: unknown[]) => unknown;
};

const modProto = Module.prototype as unknown as ModuleWithRequire;
const origRequire = modProto.require;

modProto.require = function (this: unknown, ...args: unknown[]) {
  const mod = origRequire.apply(this, args);
  if (args[0] === "@next/env" && mod && typeof mod === "object") {
    (mod as Record<string, unknown>).default = mod;
    return mod;
  }
  return mod;
};

import fs from "node:fs";
import path from "node:path";
import { catalogHero, products } from "../src/lib/catalog";
import { about, clients, hero, site, successStory, tms, whyChoose } from "../src/lib/content";

async function seed() {
  console.log("Seeding Payload CMS with initial data...");
  const { getPayload } = await import("payload");
  const configPromise = (await import("../payload.config")).default;
  const payload = await getPayload({ config: configPromise });

  // 1. Seed SiteConfig Global
  await payload.updateGlobal({
    slug: "site-config",
    data: {
      name: site.name,
      tagline: site.tagline,
      blurb: site.blurb,
      email: site.email,
      hrEmail: site.hrEmail,
      phone: site.phone,
      whatsapp: site.whatsapp,
      address: site.address,
    },
  });
  console.log("✅ SiteConfig seeded");

  async function uploadMediaIfExist(relativePath?: string, alt?: string) {
    if (!relativePath) return undefined;
    const cleanPath = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
    const fullPath = path.resolve(process.cwd(), "public", cleanPath);
    if (fs.existsSync(fullPath)) {
      try {
        const mediaDoc = await payload.create({
          collection: "media",
          filePath: fullPath,
          data: { alt: alt || "Hero Media" },
        });
        return mediaDoc.id;
      } catch (err) {
        console.warn(`Could not upload media for ${cleanPath}:`, err);
      }
    }
    return undefined;
  }

  // Upload Why Choose images to media if needed
  const seededWhyChooseItems = [];
  for (const item of whyChoose.items) {
    const mediaId = await uploadMediaIfExist(item.image, `${item.tag} Image`);

    seededWhyChooseItems.push({
      tag: item.tag,
      title: item.title,
      highlight: item.highlight ? item.highlight.join(", ") : undefined,
      body: item.body,
      icon: item.icon,
      image: mediaId,
    });
  }

  // 1b. Seed HomePage Global
  const homeHeroMediaId = await uploadMediaIfExist(hero.image, "Home Hero Media");
  await payload.updateGlobal({
    slug: "home-page",
    data: {
      title: "SaveMile · Pilih ban yang tepat, kelola lebih cerdas",
      heroEyebrow: "Tire Consultant & Distributor",
      heroDescription: hero.description,
      heroMedia: homeHeroMediaId,
      whyChooseTitle: `${whyChoose.titleLead}${whyChoose.titleAccent}${whyChoose.titleTail}`,
      whyChooseBody: whyChoose.body,
      whyChooseItems: seededWhyChooseItems,
    },
  });
  console.log("✅ HomePage seeded");

  // 1c. Seed CatalogPage Global
  const catalogHeroMediaId = await uploadMediaIfExist(catalogHero.image, "Catalog Hero Media");
  await payload.updateGlobal({
    slug: "catalog-page",
    data: {
      eyebrow: catalogHero.eyebrow,
      title: catalogHero.title,
      description: catalogHero.description,
      heroMedia: catalogHeroMediaId,
    },
  });
  console.log("✅ CatalogPage seeded");

  // 1d. Seed TmsPage Global
  const tmsHeroMediaId = await uploadMediaIfExist("/assets/images/tms-banner.webp", "TMS Hero Media");
  const seededTmsFeatureItems = [];
  for (const item of tms.features.items) {
    const mediaId = await uploadMediaIfExist(item.image, `${item.title} Media`);
    seededTmsFeatureItems.push({
      title: item.title,
      desc: item.desc,
      media: mediaId,
    });
  }

  await payload.updateGlobal({
    slug: "tms-page",
    data: {
      title: "Tire Management Solution",
      heroMedia: tmsHeroMediaId,
      featuresTitle: `${tms.features.titleLead}${tms.features.titleAccent}`,
      featureItems: seededTmsFeatureItems,
    },
  });
  console.log("✅ TmsPage seeded");

  // 1e. Seed AboutPage Global
  const aboutHeroMediaId = await uploadMediaIfExist("/assets/images/about-banner.webp", "About Hero Media");
  await payload.updateGlobal({
    slug: "about-page",
    data: {
      title: `${about.hero.titleLead}${about.hero.titleAccent}`,
      heroMedia: aboutHeroMediaId,
      storyTitle: about.story.title,
      storyBody: about.story.body.map((p) => ({ paragraph: p })),
      trustTitle: about.trust.title,
      trustBody: about.trust.body,
    },
  });
  console.log("✅ AboutPage seeded");

  // 2. Seed Brands
  const brandDocs: Record<string, { id: string | number; slug?: string }> = {};

  const existingBrands = await payload.find({ collection: "brands" });
  for (const b of existingBrands.docs) {
    brandDocs[b.slug] = b;
  }

  if (!brandDocs.tiron) {
    const tiron = await payload.create({
      collection: "brands",
      data: {
        name: "Tiron",
        slug: "tiron",
        tagline: "Korea Technology Since 1951 · Indonesia Global Factory",
        note: "Korea Tech · 1951",
      },
    });
    brandDocs.tiron = tiron;
  }

  if (!brandDocs.doublestar) {
    const doublestar = await payload.create({
      collection: "brands",
      data: {
        name: "Doublestar",
        slug: "doublestar",
        tagline: "China · Kumho Group · Indonesia Since 2018",
        note: "China · Kumho Group",
      },
    });
    brandDocs.doublestar = doublestar;
  }

  console.log("✅ Brands seeded");

  // 3. Seed Products
  const existingProducts = await payload.find({ collection: "products", limit: 100 });
  const existingNames = new Set(existingProducts.docs.map((p) => p.name));

  let seededCount = 0;
  for (const prod of products) {
    if (existingNames.has(prod.name)) {
      continue;
    }

    const brandDoc = brandDocs[prod.brand];
    if (!brandDoc) {
      console.warn(`Brand ${prod.brand} not found for product ${prod.name}`);
      continue;
    }

    await payload.create({
      collection: "products",
      data: {
        name: prod.name,
        brand: brandDoc.id,
        brandChip: prod.brandChip,
        tipe: prod.tipe,
        compatible: prod.compatible,
        medan: prod.medan,
        fitur: prod.fitur,
        sizes: prod.sizes.map((s) => ({ size: s })),
        description: prod.description,
      },
    });
    seededCount++;
  }

  console.log(`✅ Seeded ${seededCount} new products (Total catalogue items: ${products.length})`);

  // 4. Seed Clients
  const existingClients = await payload.find({ collection: "clients", limit: 100, depth: 1 });
  const existingClientMap = new Map(existingClients.docs.map((c) => [c.name, c]));

  let seededClientsCount = 0;
  for (let i = 0; i < clients.logos.length; i++) {
    const clientItem = clients.logos[i];
    const clientName = typeof clientItem === "string" ? clientItem : clientItem.name;
    const clientSrc = typeof clientItem === "string" ? "" : clientItem.src;
    const existing = existingClientMap.get(clientName);

    let mediaId: string | number | undefined =
      typeof existing?.logo === "object" && existing?.logo !== null
        ? (existing.logo as { id: string | number }).id
        : (existing?.logo as string | number | undefined);

    if (!mediaId && clientSrc) {
      const relativePath = clientSrc.startsWith("/") ? clientSrc.slice(1) : clientSrc;
      const logoPath = path.resolve(process.cwd(), "public", relativePath);

      if (fs.existsSync(logoPath)) {
        try {
          const mediaDoc = await payload.create({
            collection: "media",
            filePath: logoPath,
            data: {
              alt: `${clientName} Logo`,
            },
          });
          mediaId = mediaDoc.id;
        } catch (err) {
          console.warn(`Could not upload media logo for ${clientName}:`, err);
        }
      }
    }

    if (!existing) {
      await payload.create({
        collection: "clients",
        data: {
          name: clientName,
          logo: mediaId,
          logoUrl: clientSrc || undefined,
          order: i + 1,
        },
      });
      seededClientsCount++;
    } else if (!existing.logo || !(existing as { logoUrl?: string }).logoUrl) {
      await payload.update({
        collection: "clients",
        id: existing.id,
        data: {
          logo: mediaId || existing.logo,
          logoUrl: clientSrc || (existing as { logoUrl?: string }).logoUrl,
          order: i + 1,
        },
      });
    }
  }
  console.log(`✅ Seeded ${seededClientsCount} new clients (Total clients: ${clients.logos.length})`);

  // 5. Seed Success Stories
  const existingStories = await payload.find({ collection: "success-stories", limit: 100, depth: 1 });
  const existingStoryMap = new Map(existingStories.docs.map((s) => [s.title, s]));

  let seededStoriesCount = 0;
  for (const storyItem of successStory.items) {
    const existing = existingStoryMap.get(storyItem.title);

    let mediaId: string | number | undefined =
      typeof existing?.image === "object" && existing?.image !== null
        ? (existing.image as { id: string | number }).id
        : (existing?.image as string | number | undefined);

    if (!mediaId && storyItem.image) {
      const relativePath = storyItem.image.startsWith("/")
        ? storyItem.image.slice(1)
        : storyItem.image;
      const imagePath = path.resolve(process.cwd(), "public", relativePath);

      if (fs.existsSync(imagePath)) {
        try {
          const mediaDoc = await payload.create({
            collection: "media",
            filePath: imagePath,
            data: {
              alt: `${storyItem.title} Image`,
            },
          });
          mediaId = mediaDoc.id;
        } catch (err) {
          console.warn(`Could not upload media image for ${storyItem.title}:`, err);
        }
      }
    }

    if (!existing) {
      await payload.create({
        collection: "success-stories",
        data: {
          tag: storyItem.tag,
          title: storyItem.title,
          units: storyItem.units,
          description: storyItem.description,
          href: storyItem.href,
          image: mediaId,
        },
      });
      seededStoriesCount++;
    } else if (!existing.image && mediaId) {
      await payload.update({
        collection: "success-stories",
        id: existing.id,
        data: {
          image: mediaId,
        },
      });
    }
  }
  console.log(`✅ Seeded ${seededStoriesCount} new success stories (Total items: ${successStory.items.length})`);

  // Link success stories to HomePage global
  const allStories = await payload.find({ collection: "success-stories", limit: 100 });
  if (allStories.docs.length > 0) {
    const storyIds = allStories.docs.map((doc) => doc.id);
    await payload.updateGlobal({
      slug: "home-page",
      data: {
        successStories: storyIds,
      },
    });
    console.log(`✅ Linked ${storyIds.length} success stories to HomePage global`);
  }

  // Seed TmsPage global default consultation values
  const tmsPageDoc = await payload.findGlobal({ slug: "tms-page" }).catch(() => null);
  if (tmsPageDoc && !tmsPageDoc.consultationTitle) {
    await payload.updateGlobal({
      slug: "tms-page",
      data: {
        consultationTitle: "Konsultasi berkualitas secara berkala, berbasis data",
        consultationHighlight: "berbasis data",
        consultationDescription:
          "Kami selalu memberikan konsultasi laporan CPK ban untuk memastikan setiap ban yang Anda gunakan konsisten sesuai standar kualitas dan performa terbaik.",
      },
    });
    console.log("✅ Seeded TmsPage consultation fields");
  }

  console.log("Seeding process complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});

