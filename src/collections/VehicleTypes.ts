import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate';

const revalidateVehicleTypes = revalidateCollection([
  '/solusi/ban',
  '/solusi/ban/[id]',
]);

export const VehicleTypes: CollectionConfig = {
  slug: 'vehicle-types',
  labels: {
    singular: 'Jenis Kendaraan',
    plural: 'Jenis Kendaraan',
  },
  hooks: {
    afterChange: [revalidateVehicleTypes],
    afterDelete: [revalidateVehicleTypes],
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
      label: 'Nama Jenis Kendaraan (e.g. Bus, Truk Berat, Truk Ringan)',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug / Key (e.g. bus, trukBerat, trukRingan)',
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
