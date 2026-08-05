import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate';

const revalidateBrands = revalidateCollection('/solusi/ban');

export const Brands: CollectionConfig = {
  slug: 'brands',
  hooks: {
    afterChange: [revalidateBrands],
    afterDelete: [revalidateBrands],
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'note',
      type: 'text',
    },
  ],
};
