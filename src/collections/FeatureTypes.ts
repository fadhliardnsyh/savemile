import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate';

const revalidateFeatureTypes = revalidateCollection([
  '/solusi/ban',
  '/solusi/ban/[id]',
]);

export const FeatureTypes: CollectionConfig = {
  slug: 'feature-types',
  labels: {
    singular: 'Fitur Unggulan',
    plural: 'Fitur Unggulan',
  },
  hooks: {
    afterChange: [revalidateFeatureTypes],
    afterDelete: [revalidateFeatureTypes],
  },
  admin: {
    useAsTitle: 'name',
    group: 'Katalog Ban',
    defaultColumns: ['name', 'slug', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Fitur (e.g. Anti Aus, Handling, Fuel Efficiency)',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug / Key (e.g. antiAus, handling, fuelEfficiency)',
      required: true,
      unique: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan Tampil',
      defaultValue: 0,
    },
  ],
};
