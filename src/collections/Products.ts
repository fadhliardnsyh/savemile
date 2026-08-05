import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
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
      type: 'select',
      options: [
        { label: 'Radial', value: 'radial' },
        { label: 'Bias', value: 'bias' },
      ],
      required: true,
    },
    {
      name: 'compatible',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Bus', value: 'bus' },
        { label: 'Truk Berat', value: 'trukBerat' },
        { label: 'Truk Ringan', value: 'trukRingan' },
      ],
    },
    {
      name: 'medan',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Perjalanan Panjang', value: 'perjalananPanjang' },
        { label: 'Jalan Perkotaan', value: 'jalanPerkotaan' },
        { label: 'Standar', value: 'standar' },
        { label: 'Off Road', value: 'offRoad' },
      ],
    },
    {
      name: 'fitur',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Anti Aus', value: 'antiAus' },
        { label: 'Handling', value: 'handling' },
        { label: 'Fuel Efficiency', value: 'fuelEfficiency' },
        { label: 'Anti Tear', value: 'antiTear' },
        { label: 'Beban Berat', value: 'bebanBerat' },
        { label: 'Jarak Tempuh Tinggi', value: 'jarakTempuh' },
      ],
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
