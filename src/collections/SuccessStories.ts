import type { CollectionConfig } from 'payload';

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'units',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'href',
      type: 'text',
      defaultValue: '/insight/success-story',
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
};
