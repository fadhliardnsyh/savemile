import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate';

const revalidateSuccessStories = revalidateCollection(['/', '/insight/success-story']);

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  hooks: {
    afterChange: [revalidateSuccessStories],
    afterDelete: [revalidateSuccessStories],
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      index: true,
    },
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
      name: 'challenge',
      type: 'textarea',
    },
    {
      name: 'solution',
      type: 'textarea',
    },
    {
      name: 'body',
      type: 'array',
      fields: [
        {
          name: 'paragraph',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
    {
      name: 'href',
      type: 'text',
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
};
