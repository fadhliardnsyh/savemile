import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate';

const revalidateTireTypes = revalidateCollection([
  '/solusi/ban',
  '/solusi/ban/[id]',
]);

export const TireTypes: CollectionConfig = {
  slug: 'tire-types',
  labels: {
    singular: 'Tipe Ban',
    plural: 'Tipe Ban',
  },
  hooks: {
    afterChange: [revalidateTireTypes],
    afterDelete: [revalidateTireTypes],
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
      label: 'Nama Tipe (e.g. Radial, Bias)',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug / Key (e.g. radial, bias)',
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
