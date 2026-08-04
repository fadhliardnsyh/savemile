import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { site, clients, successStory } from '@/lib/content';
import { products } from '@/lib/catalog';

interface BrandDoc {
  id: string | number;
  slug?: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    // 1. Seed SiteConfig Global
    await payload.updateGlobal({
      slug: 'site-config',
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

    // 3. Seed Products
    const existingProducts = await payload.find({ collection: 'products', limit: 200 });
    const existingNames = new Set(existingProducts.docs.map((p) => p.name));

    let seededCount = 0;
    for (const prod of products) {
      if (existingNames.has(prod.name)) {
        continue;
      }

      const brandDoc = brandDocs[prod.brand];
      if (!brandDoc) {
        continue;
      }

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
        },
      });
      seededCount++;
    }

    // 4. Seed Clients
    const existingClients = await payload.find({ collection: 'clients', limit: 100, depth: 1 });
    const existingClientMap = new Map(existingClients.docs.map((c) => [c.name, c]));

    let seededClientsCount = 0;
    for (let i = 0; i < clients.logos.length; i++) {
      const clientItem = clients.logos[i];
      const clientName = typeof clientItem === 'string' ? clientItem : clientItem.name;
      const clientSrc = typeof clientItem === 'string' ? '' : clientItem.src;
      const existing = existingClientMap.get(clientName);

      let mediaId: string | number | undefined =
        typeof existing?.logo === 'object' && existing?.logo !== null
          ? (existing.logo as { id: string | number }).id
          : (existing?.logo as string | number | undefined);

      if (!mediaId && clientSrc) {
        const relativePath = clientSrc.startsWith('/') ? clientSrc.slice(1) : clientSrc;
        const logoPath = path.resolve(process.cwd(), 'public', relativePath);

        if (fs.existsSync(logoPath)) {
          try {
            const mediaDoc = await payload.create({
              collection: 'media',
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
          collection: 'clients',
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
          collection: 'clients',
          id: existing.id,
          data: {
            logo: mediaId || existing.logo,
            logoUrl: clientSrc || (existing as { logoUrl?: string }).logoUrl,
            order: i + 1,
          },
        });
      }
    }

    // 5. Seed Success Stories
    const existingStories = await payload.find({ collection: 'success-stories', limit: 100, depth: 1 });
    const existingStoryMap = new Map(existingStories.docs.map((s) => [s.title, s]));

    let seededStoriesCount = 0;
    for (const storyItem of successStory.items) {
      const existing = existingStoryMap.get(storyItem.title);

      let mediaId: string | number | undefined =
        typeof existing?.image === 'object' && existing?.image !== null
          ? (existing.image as { id: string | number }).id
          : (existing?.image as string | number | undefined);

      if (!mediaId && storyItem.image) {
        const relativePath = storyItem.image.startsWith('/')
          ? storyItem.image.slice(1)
          : storyItem.image;
        const imagePath = path.resolve(process.cwd(), 'public', relativePath);

        if (fs.existsSync(imagePath)) {
          try {
            const mediaDoc = await payload.create({
              collection: 'media',
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
          collection: 'success-stories',
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
          collection: 'success-stories',
          id: existing.id,
          data: {
            image: mediaId,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seeding complete. Seeded ${seededCount} products, ${seededClientsCount} clients, and ${seededStoriesCount} success stories into Payload CMS.`,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
