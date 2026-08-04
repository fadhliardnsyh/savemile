import type { GlobalConfig } from 'payload';

export const CatalogPage: GlobalConfig = {
  slug: 'catalog-page',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Katalog Produk',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Ban Truk & Kendaraan Niaga',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'heroImage',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
};
