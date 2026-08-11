import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate';

const revalidateProduct = revalidateCollection((doc: any) => {
  const computedSlug = doc?.name
    ? doc.name.toLowerCase().replace(/\s+/g, '-')
    : String(doc?.id || '');

  const paths = ['/solusi/ban'];

  if (computedSlug) {
    paths.push(`/solusi/ban/${computedSlug}`);
  }

  if (doc?.id && String(doc.id) !== computedSlug) {
    paths.push(`/solusi/ban/${doc.id}`);
  }

  return paths;
});

export const Products: CollectionConfig = {
  slug: 'products',
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProduct],
  },
  admin: {
    useAsTitle: 'name',
    group: 'Katalog Ban',
    defaultColumns: ['name', 'brand', 'tipe', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
    },
    {
      name: 'brandChip',
      type: 'text',
    },
    {
      name: 'tipe',
      type: 'relationship',
      relationTo: 'tire-types',
      required: true,
    },
    {
      name: 'compatible',
      type: 'relationship',
      relationTo: 'vehicle-types',
      hasMany: true,
    },
    {
      name: 'medan',
      type: 'relationship',
      relationTo: 'terrain-types',
      hasMany: true,
    },
    {
      name: 'fitur',
      type: 'relationship',
      relationTo: 'feature-types',
      hasMany: true,
    },
    {
      name: 'sizes',
      type: 'array',
      fields: [
        {
          name: 'size',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
};
