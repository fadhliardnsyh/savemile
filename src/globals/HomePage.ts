import type { GlobalConfig } from 'payload';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  fields: [
    {
      name: 'heroEyebrow',
      type: 'text',
      defaultValue: 'Tire Consultant & Distributor',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
    },
    {
      name: 'heroImage',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'whyChooseTitle',
      type: 'text',
    },
    {
      name: 'whyChooseBody',
      type: 'textarea',
    },
  ],
};
