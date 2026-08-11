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

process.env.IS_SEEDING = "true";

// Load .env file for CLI execution
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    for (const line of envConfig.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...values] = trimmed.split("=");
        if (key && values.length > 0) {
          const k = key.trim();
          if (!process.env[k]) {
            process.env[k] = values.join("=").trim();
          }
        }
      }
    }
  }
} catch (e) {}

import {
  catalogHero,
  infoStrip,
  infoStripDefaults,
  products,
  tipeOptions,
  compatibleOptions,
  medanOptions,
  fiturOptions,
  medanIcons,
  type Medan,
} from "../src/lib/catalog";
import {
  about,
  career,
  clients,
  contact,
  coverage,
  hero,
  site,
  successStory,
  tms,
  whyChoose,
} from "../src/lib/content";

async function seed() {
  console.log("Seeding Payload CMS with missing initial data...");
  const { getPayload } = await import("payload");
  const configPromise = (await import("../payload.config")).default;
  const payload = await getPayload({ config: configPromise });

  async function uploadMediaIfExist(relativePath?: string, alt?: string) {
    if (!relativePath) return undefined;
    const cleanPath = relativePath.startsWith("/")
      ? relativePath.slice(1)
      : relativePath;
    const filename = path.basename(cleanPath);
    try {
      const existingMedia = await payload.find({
        collection: "media",
        where: {
          filename: {
            equals: filename,
          },
        },
        limit: 1,
      });
      if (existingMedia.docs.length > 0) {
        return existingMedia.docs[0].id;
      }
    } catch (err) {}

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

  // 1. Seed SiteConfig Global (only if unpopulated)
  const existingSiteConfig = await payload
    .findGlobal({ slug: "site-config" })
    .catch(() => null);
  if (!existingSiteConfig || !existingSiteConfig.name) {
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
        whatsappMessage:
          "Halo SaveMile, saya ingin berkonsultasi mengenai ban armada.",
        address: site.address,
      },
    });
    console.log("✅ SiteConfig seeded");
  } else {
    console.log("ℹ️ SiteConfig already present, skipping");
  }

  // 1b. Seed HomePage Global (only if unpopulated)
  const existingHomePage = await payload
    .findGlobal({ slug: "home-page" })
    .catch(() => null);
  if (!existingHomePage || !existingHomePage.title) {
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

    const homeHeroMediaId = await uploadMediaIfExist(
      hero.image,
      "Home Hero Media",
    );

    await payload.updateGlobal({
      slug: "home-page",
      data: {
        title: "SaveMile · Pilih ban yang tepat, kelola lebih cerdas",
        heroEyebrow: "Tire Consultant & Distributor",
        heroDescription: hero.description,
        heroMedia: homeHeroMediaId,
        whyChooseTitle: `${whyChoose.titleLead}${whyChoose.titleAccent}${whyChoose.titleTail}`,
        whyChooseTitleHighlight: "pengguna",
        whyChooseBody: whyChoose.body,
        whyChooseItems: seededWhyChooseItems,
        coverageTitle: coverage.title,
        coverageAccent: coverage.accent,
        coverageBody: coverage.body,
        coverageStats: coverage.stats,
        coverageBranches: coverage.branches,
      },
    });
    console.log("✅ HomePage seeded");
  } else {
    console.log("ℹ️ HomePage already present, skipping");
  }

  // 1c. Seed CatalogPage Global (only if unpopulated or filter options missing)
  const existingCatalogPage = await payload
    .findGlobal({ slug: "catalog-page" })
    .catch(() => null);
  if (
    !existingCatalogPage ||
    !existingCatalogPage.title ||
    !existingCatalogPage.filterTipeOptions ||
    (Array.isArray(existingCatalogPage.filterTipeOptions) &&
      existingCatalogPage.filterTipeOptions.length === 0)
  ) {
    const catalogHeroMediaId = await uploadMediaIfExist(
      catalogHero.image,
      "Catalog Hero Media",
    );
    await payload.updateGlobal({
      slug: "catalog-page",
      data: {
        title: existingCatalogPage?.title || catalogHero.title,
        heroMedia: (existingCatalogPage?.heroMedia as any)?.id || catalogHeroMediaId,
        whatsappMessage:
          existingCatalogPage?.whatsappMessage ||
          "Halo SaveMile, saya ingin bertanya mengenai katalog ban.",
        infoStripTitle:
          existingCatalogPage?.infoStripTitle || infoStripDefaults.title,
        infoStripTitleHighlight:
          existingCatalogPage?.infoStripTitleHighlight ||
          infoStripDefaults.highlight.join(", "),
        infoStripItems:
          (existingCatalogPage?.infoStripItems as any) || infoStrip,
        filterTipeOptions: tipeOptions.map((o) => ({
          key: o.key,
          label: o.label,
        })),
        filterCompatibleOptions: compatibleOptions.map((o) => ({
          key: o.key,
          label: o.label,
        })),
        filterMedanOptions: medanOptions.map((o) => ({
          key: o.key,
          label: o.label,
          icon: medanIcons[o.key as Medan] || "road",
        })),
        filterFiturOptions: fiturOptions.map((o) => ({
          key: o.key,
          label: o.label,
        })),
      },
    });
    console.log("✅ CatalogPage seeded with filter and category options");
  } else {
    console.log("ℹ️ CatalogPage already present, skipping");
  }

  // 1d. Seed TmsPage Global (only if unpopulated)
  const existingTmsPage = await payload
    .findGlobal({ slug: "tms-page" })
    .catch(() => null);
  if (!existingTmsPage || !existingTmsPage.title) {
    const tmsHeroMediaId = await uploadMediaIfExist(
      "/assets/images/tms-banner.webp",
      "TMS Hero Media",
    );
    const seededTmsFeatureItems = [];
    for (const item of tms.features.items) {
      const mediaId = await uploadMediaIfExist(item.image, `${item.title} Media`);
      seededTmsFeatureItems.push({
        title: item.title,
        desc: item.desc,
        icon: item.icon,
        media: mediaId,
      });
    }

    await payload.updateGlobal({
      slug: "tms-page",
      data: {
        title: "Tire Management Solution",
        heroMedia: tmsHeroMediaId,
        howTitle: `${tms.how.titleLead}${tms.how.titleAccent}`,
        howHighlight: tms.how.titleAccent,
        howDescription: tms.how.description,
        howSteps: tms.how.steps.map((step) => ({
          title: step.title,
          desc: step.desc,
          icon: step.icon,
        })),
        featuresTitle: tms.features.title,
        featuresHighlight: "berbasis data",
        featureItems: seededTmsFeatureItems,
        consultationTitle:
          "Konsultasi berkualitas secara berkala, berbasis data",
        consultationHighlight: "berbasis data",
        consultationDescription:
          "Kami selalu memberikan konsultasi laporan CPK ban untuk memastikan setiap ban yang Anda gunakan konsisten sesuai standar kualitas dan performa terbaik.",
      },
    });
    console.log("✅ TmsPage seeded");
  } else {
    console.log("ℹ️ TmsPage already present, skipping");
  }

  // 1e. Seed AboutPage Global (only if unpopulated)
  const existingAboutPage = await payload
    .findGlobal({ slug: "about-page" })
    .catch(() => null);
  if (!existingAboutPage || !existingAboutPage.title) {
    const aboutHeroMediaId = await uploadMediaIfExist(
      "/assets/images/about-banner.webp",
      "About Hero Media",
    );
    await payload.updateGlobal({
      slug: "about-page",
      data: {
        title: `${about.hero.titleLead}${about.hero.titleAccent}`,
        heroMedia: aboutHeroMediaId,
        storyTitle: about.story.title,
        storyTitleHighlight: "distributor ban",
        storyBody: about.story.body.map((p) => ({ paragraph: p })),
        trustTitle: about.trust.title,
        trustTitleHighlight: "BUMN, perusahaan swasta terkemuka",
        trustBody: about.trust.body,
      },
    });
    console.log("✅ AboutPage seeded");
  } else {
    console.log("ℹ️ AboutPage already present, skipping");
  }

  // 1f. Seed CareerPage Global (only if unpopulated)
  const existingCareerPage = await payload
    .findGlobal({ slug: "career-page" })
    .catch(() => null);
  if (!existingCareerPage || !existingCareerPage.title) {
    const careerHeroMediaId = await uploadMediaIfExist(
      "/assets/images/career-banner.webp",
      "Career Hero Media",
    );
    await payload.updateGlobal({
      slug: "career-page",
      data: {
        title: "Karir",
        heroTitle: `${career.hero.titleLead}${career.hero.titleAccent}`,
        heroDescription: career.hero.description,
        heroMedia: careerHeroMediaId,
        valuesTitle: career.values.title,
        valuesTitleHighlight: career.values.titleAccent,
        valuesBody: career.values.body,
        valuesItems: career.values.items.map((item) => ({
          title: item.title,
          desc: item.desc,
          icon: item.icon,
        })),
        ctaTitle: `${career.join.titleLead}${career.join.titleAccent}`,
        ctaTitleHighlight: career.join.titleAccent,
        ctaDescription: career.join.description,
        ctaActionText: career.join.action.label,
        ctaActionUrl: career.join.action.href,
      },
    });
    console.log("✅ CareerPage seeded");
  } else {
    console.log("ℹ️ CareerPage already present, skipping");
  }

  // 1g. Seed ContactPage Global (only if unpopulated)
  const existingContactPage = await payload
    .findGlobal({ slug: "contact-page" })
    .catch(() => null);
  if (!existingContactPage || !existingContactPage.title) {
    const contactHeroMediaId = await uploadMediaIfExist(
      "/assets/images/contact-banner.webp",
      "Contact Hero Media",
    );
    await payload.updateGlobal({
      slug: "contact-page",
      data: {
        title: "Hubungi Kami",
        heroTitle: `${contact.hero.titleLead}${contact.hero.titleAccent}`,
        heroDescription: contact.hero.description,
        heroMedia: contactHeroMediaId,
        whatsappMessage:
          "Halo SaveMile, saya ingin berkonsultasi mengenai layanan dan produk ban.",
        helpTitle: contact.help.title,
        helpHighlight: "membantu Anda?",
        helpBody: contact.help.body,
        helpOptions: contact.help.options.map((item) => ({
          title: item.title,
          tag: item.tag,
          desc: item.desc,
          icon: item.icon,
          actionLabel: item.actionLabel,
          href: item.href,
          external: item.external,
        })),
        infoItems: contact.info.map((item) => ({
          label: item.label,
          value: item.value,
          icon: item.icon,
          href: "href" in item ? item.href : undefined,
        })),
      },
    });
    console.log("✅ ContactPage seeded");
  } else {
    console.log("ℹ️ ContactPage already present, skipping");
  }

  // 2. Seed Brands (only missing)
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

  console.log("✅ Brands check complete");

  // 2b. Seed TireTypes
  const tireDocs: Record<string, { id: string | number; slug?: string }> = {};
  const existingTires = await payload.find({ collection: "tire-types" as any });
  for (const t of existingTires.docs) {
    tireDocs[(t as any).slug] = t as any;
  }
  for (let i = 0; i < tipeOptions.length; i++) {
    const opt = tipeOptions[i];
    if (!tireDocs[opt.key]) {
      const doc = await payload.create({
        collection: "tire-types" as any,
        data: {
          name: opt.label,
          slug: opt.key,
          order: i,
        },
      });
      tireDocs[opt.key] = doc as any;
    }
  }

  // 2c. Seed VehicleTypes
  const vehicleDocs: Record<string, { id: string | number; slug?: string }> = {};
  const existingVehicles = await payload.find({ collection: "vehicle-types" as any });
  for (const v of existingVehicles.docs) {
    vehicleDocs[(v as any).slug] = v as any;
  }
  for (let i = 0; i < compatibleOptions.length; i++) {
    const opt = compatibleOptions[i];
    if (!vehicleDocs[opt.key]) {
      const doc = await payload.create({
        collection: "vehicle-types" as any,
        data: {
          name: opt.label,
          slug: opt.key,
          order: i,
        },
      });
      vehicleDocs[opt.key] = doc as any;
    }
  }

  // 2d. Seed TerrainTypes
  const terrainDocs: Record<string, { id: string | number; slug?: string }> = {};
  const existingTerrains = await payload.find({ collection: "terrain-types" as any });
  for (const t of existingTerrains.docs) {
    terrainDocs[(t as any).slug] = t as any;
  }
  for (let i = 0; i < medanOptions.length; i++) {
    const opt = medanOptions[i];
    if (!terrainDocs[opt.key]) {
      const doc = await payload.create({
        collection: "terrain-types" as any,
        data: {
          name: opt.label,
          slug: opt.key,
          icon: medanIcons[opt.key as Medan] || "road",
          order: i,
        },
      });
      terrainDocs[opt.key] = doc as any;
    }
  }

  // 2e. Seed FeatureTypes
  const featureDocs: Record<string, { id: string | number; slug?: string }> = {};
  const existingFeatures = await payload.find({ collection: "feature-types" as any });
  for (const f of existingFeatures.docs) {
    featureDocs[(f as any).slug] = f as any;
  }
  for (let i = 0; i < fiturOptions.length; i++) {
    const opt = fiturOptions[i];
    if (!featureDocs[opt.key]) {
      const doc = await payload.create({
        collection: "feature-types" as any,
        data: {
          name: opt.label,
          slug: opt.key,
          order: i,
        },
      });
      featureDocs[opt.key] = doc as any;
    }
  }

  console.log("✅ Master Categories check complete");

  // 3. Seed Products (ONLY missing products created)
  const existingProducts = await payload.find({
    collection: "products",
    limit: 500,
  });
  const existingProductNames = new Set(
    existingProducts.docs.map((p) => p.name.toLowerCase()),
  );

  let seededCount = 0;
  for (const prod of products) {
    if (existingProductNames.has(prod.name.toLowerCase())) {
      continue;
    }

    const brandDoc = brandDocs[prod.brand];
    if (!brandDoc) {
      console.warn(`Brand ${prod.brand} not found for product ${prod.name}`);
      continue;
    }

    const mediaId = await uploadMediaIfExist(prod.image, `${prod.name} Image`);

    const tipeId = tireDocs[prod.tipe]?.id;
    const compatibleIds = prod.compatible
      .map((c) => vehicleDocs[c]?.id)
      .filter(Boolean);
    const medanIds = prod.medan
      .map((m) => terrainDocs[m]?.id)
      .filter(Boolean);
    const fiturIds = prod.fitur
      .map((f) => featureDocs[f]?.id)
      .filter(Boolean);

    await payload.create({
      collection: "products",
      data: {
        name: prod.name,
        brand: brandDoc.id,
        brandChip: prod.brandChip,
        tipe: tipeId || prod.tipe,
        compatible: compatibleIds.length > 0 ? compatibleIds : prod.compatible,
        medan: medanIds.length > 0 ? medanIds : prod.medan,
        fitur: fiturIds.length > 0 ? fiturIds : prod.fitur,
        sizes: prod.sizes.map((s) => ({ size: s })),
        description: prod.description,
        image: mediaId,
      },
    });
    seededCount++;
  }

  console.log(
    `✅ Seeded ${seededCount} new products (Total catalogue items in static seed: ${products.length})`,
  );

  // 4. Seed Clients (ONLY missing clients created)
  const existingClients = await payload.find({
    collection: "clients",
    limit: 100,
    depth: 1,
  });
  const existingClientNames = new Set(
    existingClients.docs.map((c) => c.name.toLowerCase()),
  );

  let seededClientsCount = 0;
  for (let i = 0; i < clients.logos.length; i++) {
    const clientItem = clients.logos[i];
    const clientName =
      typeof clientItem === "string" ? clientItem : clientItem.name;
    const clientSrc = typeof clientItem === "string" ? "" : clientItem.src;

    if (existingClientNames.has(clientName.toLowerCase())) {
      continue;
    }

    const mediaId = await uploadMediaIfExist(clientSrc, `${clientName} Logo`);

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
  }
  console.log(
    `✅ Seeded ${seededClientsCount} new clients (Total clients in static seed: ${clients.logos.length})`,
  );

  // 5. Seed Success Stories (ONLY missing stories created)
  const existingStories = await payload.find({
    collection: "success-stories",
    limit: 100,
    depth: 1,
  });
  const existingStoryTitles = new Set(
    existingStories.docs.map((s) => s.title.toLowerCase()),
  );

  let seededStoriesCount = 0;
  for (const storyItem of successStory.items) {
    if (existingStoryTitles.has(storyItem.title.toLowerCase())) {
      continue;
    }

    const mediaId = await uploadMediaIfExist(
      storyItem.image,
      `${storyItem.title} Image`,
    );

    await payload.create({
      collection: "success-stories",
      data: {
        slug: storyItem.slug,
        tag: storyItem.tag,
        title: storyItem.title,
        units: storyItem.units,
        description: storyItem.description,
        challenge: storyItem.challenge,
        solution: storyItem.solution,
        body: storyItem.body
          ? storyItem.body.map((p) => ({ paragraph: p }))
          : undefined,
        metrics: storyItem.metrics,
        href: storyItem.href,
        image: mediaId,
      },
    });
    seededStoriesCount++;
  }
  console.log(
    `✅ Seeded ${seededStoriesCount} new success stories (Total items in static seed: ${successStory.items.length})`,
  );

  // Link success stories to HomePage global if successStories is empty
  const homePageDoc = await payload
    .findGlobal({ slug: "home-page" })
    .catch(() => null);
  if (
    homePageDoc &&
    (!homePageDoc.successStories ||
      (Array.isArray(homePageDoc.successStories) &&
        homePageDoc.successStories.length === 0))
  ) {
    const allStories = await payload.find({
      collection: "success-stories",
      limit: 100,
    });
    if (allStories.docs.length > 0) {
      const storyIds = allStories.docs.map((doc) => doc.id);
      await payload.updateGlobal({
        slug: "home-page",
        data: {
          successStories: storyIds,
        },
      });
      console.log(
        `✅ Linked ${storyIds.length} success stories to HomePage global`,
      );
    }
  }

  console.log("Seeding process complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
