import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate';

const revalidateTerrainTypes = revalidateCollection([
  '/solusi/ban',
  '/solusi/ban/[id]',
]);

export const TerrainTypes: CollectionConfig = {
  slug: 'terrain-types',
  labels: {
    singular: 'Medan Operasional',
    plural: 'Medan Operasional',
  },
  hooks: {
    afterChange: [revalidateTerrainTypes],
    afterDelete: [revalidateTerrainTypes],
  },
  admin: {
    useAsTitle: 'name',
    group: 'Katalog Ban',
    defaultColumns: ['name', 'slug', 'icon', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Medan (e.g. Perjalanan Panjang, Jalan Perkotaan, Off Road)',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug / Key (e.g. perjalananPanjang, jalanPerkotaan, offRoad)',
      required: true,
      unique: true,
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon',
      options: [
        { label: 'Highway / Tol (highway)', value: 'highway' },
        { label: 'City / Perkotaan (city)', value: 'city' },
        { label: 'Road / Aspal (road)', value: 'road' },
        { label: 'Mountain / Off Road (mountain)', value: 'mountain' },
        { label: 'Truck (truck)', value: 'truck' },
        { label: 'Shield (shield)', value: 'shield' },
        { label: 'Bolt (bolt)', value: 'bolt' },
        { label: 'Target (target)', value: 'target' },
        { label: 'Eco / Leaf (leaf)', value: 'leaf' },
        { label: 'Wrench (wrench)', value: 'wrench' },
      ],
      defaultValue: 'road',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan Tampil',
      defaultValue: 0,
    },
  ],
};
