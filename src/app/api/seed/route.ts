import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { site, hero, whyChoose, tms, clients, successStory, nav } from '@/lib/content';
import { catalogHero, infoStrip, infoStripDefaults, products } from '@/lib/catalog';

interface BrandDoc {
  id: string | number;
  slug?: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    async function uploadMediaIfExist(relativePath?: string, alt?: string) {
      if (!relativePath) return undefined;
      const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
      const filename = path.basename(cleanPath);
      try {
        const existingMedia = await payload.find({
          collection: 'media',
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

      const fullPath = path.resolve(process.cwd(), 'public', cleanPath);
      if (fs.existsSync(fullPath)) {
        try {
          const mediaDoc = await payload.create({
            collection: 'media',
            filePath: fullPath,
            data: { alt: alt || 'Hero Media' },
          });
          return mediaDoc.id;
        } catch (err) {
          console.warn(`Could not upload media for ${cleanPath}:`, err);
        }
      }
      return undefined;
    }

    // 1. Seed SiteConfig Global (only if unpopulated or navItems missing)
    const existingSiteConfig = await payload.findGlobal({ slug: 'site-config' }).catch(() => null);
    if (
      !existingSiteConfig ||
      !existingSiteConfig.name ||
      !existingSiteConfig.navItems ||
      (Array.isArray(existingSiteConfig.navItems) && existingSiteConfig.navItems.length === 0)
    ) {
      await payload.updateGlobal({
        slug: 'site-config',
        data: {
          name: existingSiteConfig?.name || site.name,
          tagline: existingSiteConfig?.tagline || site.tagline,
          blurb: existingSiteConfig?.blurb || site.blurb,
          email: existingSiteConfig?.email || site.email,
          hrEmail: existingSiteConfig?.hrEmail || site.hrEmail,
          phone: existingSiteConfig?.phone || site.phone,
          whatsapp: existingSiteConfig?.whatsapp || site.whatsapp,
          whatsappMessage:
            (existingSiteConfig?.whatsappMessage as string) ||
            'Halo SaveMile, saya ingin berkonsultasi mengenai ban armada.',
          address: existingSiteConfig?.address || site.address,
          navItems: nav,
        },
      });
    }

    // 1b. Seed HomePage Global (only if unpopulated)
    const existingHomePage = await payload.findGlobal({ slug: 'home-page' }).catch(() => null);
    if (!existingHomePage || !existingHomePage.title) {
      const homeHeroMediaId = await uploadMediaIfExist(hero.image, 'Home Hero Media');
      await payload.updateGlobal({
        slug: 'home-page',
        data: {
          title: 'SaveMile · Pilih ban yang tepat, kelola lebih cerdas',
          heroEyebrow: 'Tire Consultant & Distributor',
          heroDescription: hero.description,
          heroMedia: homeHeroMediaId,
          whyChooseTitle: `${whyChoose.titleLead}${whyChoose.titleAccent}${whyChoose.titleTail}`,
          whyChooseBody: whyChoose.body,
        },
      });
    }

    // 1c. Seed CatalogPage Global (only if unpopulated)
    const existingCatalogPage = await payload.findGlobal({ slug: 'catalog-page' }).catch(() => null);
    if (!existingCatalogPage || !existingCatalogPage.title) {
      const catalogHeroMediaId = await uploadMediaIfExist(catalogHero.image, 'Catalog Hero Media');
      await payload.updateGlobal({
        slug: 'catalog-page',
        data: {
          title: catalogHero.title,
          heroMedia: catalogHeroMediaId,
          whatsappMessage: 'Halo SaveMile, saya ingin bertanya mengenai katalog ban.',
          infoStripTitle: infoStripDefaults.title,
          infoStripTitleHighlight: infoStripDefaults.highlight.join(', '),
          infoStripItems: infoStrip,
        },
      });
    }

    // 1d. Seed TmsPage Global (only if unpopulated)
    const existingTmsPage = await payload.findGlobal({ slug: 'tms-page' }).catch(() => null);
    if (!existingTmsPage || !existingTmsPage.title) {
      const tmsHeroMediaId = await uploadMediaIfExist('/assets/images/tms-banner.webp', 'TMS Hero Media');
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
        slug: 'tms-page',
        data: {
          title: 'Tire Management Solution',
          heroMedia: tmsHeroMediaId,
          featuresTitle: tms.features.title,
          featuresHighlight: 'berbasis data',
          featureItems: seededTmsFeatureItems,
          consultationTitle: 'Konsultasi berkualitas secara berkala, berbasis data',
          consultationHighlight: 'berbasis data',
          consultationDescription:
            'Kami selalu memberikan konsultasi laporan CPK ban untuk memastikan setiap ban yang Anda gunakan konsisten sesuai standar kualitas dan performa terbaik.',
        },
      });
    }

    // 2. Seed Brands
    const brandDocs: Record<string, BrandDoc> = {};
    const existingBrands = await payload.find({ collection: 'brands' });
    for (const b of existingBrands.docs) {
      brandDocs[b.slug] = b;
    }

    if (!brandDocs.tiron) {
      const tiron = await payload.create({
        collection: 'brands',
        data: {
          name: 'Tiron',
          slug: 'tiron',
          tagline: 'Korea Technology Since 1951 · Indonesia Global Factory',
          note: 'Korea Tech · 1951',
        },
      });
      brandDocs.tiron = tiron;
    }

    if (!brandDocs.doublestar) {
      const doublestar = await payload.create({
        collection: 'brands',
        data: {
          name: 'Doublestar',
          slug: 'doublestar',
          tagline: 'China · Kumho Group · Indonesia Since 2018',
          note: 'China · Kumho Group',
        },
      });
      brandDocs.doublestar = doublestar;
    }

    // 3. Seed Products (ONLY missing products created)
    const existingProducts = await payload.find({ collection: 'products', limit: 500 });
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
        continue;
      }

      const mediaId = await uploadMediaIfExist(prod.image, `${prod.name} Image`);

      await payload.create({
        collection: 'products',
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
          image: mediaId,
        },
      });
      seededCount++;
    }

    // 4. Seed Clients (ONLY missing clients created)
    const existingClients = await payload.find({ collection: 'clients', limit: 100, depth: 1 });
    const existingClientNames = new Set(
      existingClients.docs.map((c) => c.name.toLowerCase()),
    );

    let seededClientsCount = 0;
    for (let i = 0; i < clients.logos.length; i++) {
      const clientItem = clients.logos[i];
      const clientName = typeof clientItem === 'string' ? clientItem : clientItem.name;
      const clientSrc = typeof clientItem === 'string' ? '' : clientItem.src;

      if (existingClientNames.has(clientName.toLowerCase())) {
        continue;
      }

      const mediaId = await uploadMediaIfExist(clientSrc, `${clientName} Logo`);

      await payload.create({
        collection: 'clients',
        data: {
          name: clientName,
          logo: mediaId,
          logoUrl: clientSrc || undefined,
          order: i + 1,
        },
      });
      seededClientsCount++;
    }

    // 5. Seed Success Stories (ONLY missing stories created)
    const existingStories = await payload.find({ collection: 'success-stories', limit: 100, depth: 1 });
    const existingStoryTitles = new Set(
      existingStories.docs.map((s) => s.title.toLowerCase()),
    );

    let seededStoriesCount = 0;
    for (const storyItem of successStory.items) {
      if (existingStoryTitles.has(storyItem.title.toLowerCase())) {
        continue;
      }

      const mediaId = await uploadMediaIfExist(storyItem.image, `${storyItem.title} Image`);

      await payload.create({
        collection: 'success-stories',
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

    // Link success stories to HomePage global if empty
    const homePageDoc = await payload.findGlobal({ slug: 'home-page' }).catch(() => null);
    if (
      homePageDoc &&
      (!homePageDoc.successStories ||
        (Array.isArray(homePageDoc.successStories) && homePageDoc.successStories.length === 0))
    ) {
      const allStories = await payload.find({ collection: 'success-stories', limit: 100 });
      if (allStories.docs.length > 0) {
        const storyIds = allStories.docs.map((doc) => doc.id);
        await payload.updateGlobal({
          slug: 'home-page',
          data: {
            successStories: storyIds,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seeding complete. Seeded ${seededCount} new products, ${seededClientsCount} new clients, and ${seededStoriesCount} new success stories into Payload CMS.`,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
