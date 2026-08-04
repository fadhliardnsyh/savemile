import type { GlobalConfig } from 'payload';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title (SEO / Tab Title)',
      defaultValue: 'SaveMile · Pilih ban yang tepat, kelola lebih cerdas',
    },
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
      name: 'heroMedia',
      type: 'relationship',
      relationTo: 'media',
      label: 'Hero Media (Image or Video)',
    },
    {
      name: 'whyChooseTitle',
      type: 'text',
    },
    {
      name: 'whyChooseBody',
      type: 'textarea',
    },
    {
      name: 'whyChooseItems',
      type: 'array',
      label: 'Why Choose Items',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'highlight',
          type: 'text',
          label: 'Highlight phrases (comma separated)',
        },
        {
          name: 'body',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Consult', value: 'consult' },
            { label: 'Laser', value: 'laser' },
            { label: 'Bell', value: 'bell' },
            { label: 'Shield', value: 'shield' },
          ],
          defaultValue: 'consult',
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'successStories',
      type: 'relationship',
      relationTo: 'success-stories',
      hasMany: true,
      label: 'Selected Success Stories (First item will be the large featured card)',
    },
  ],
};
