import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate';

export const CatalogPage: GlobalConfig = {
  slug: 'catalog-page',
  hooks: {
    afterChange: [revalidateGlobal('/solusi/ban')],
  },
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
      name: 'heroMedia',
      type: 'relationship',
      relationTo: 'media',
      label: 'Hero Media (Image or Video)',
    },
    {
      name: 'whatsappMessage',
      type: 'textarea',
      label: 'WhatsApp CTA Message Template',
      defaultValue: 'Halo SaveMile, saya ingin bertanya mengenai katalog ban.',
    },
  ],
};
