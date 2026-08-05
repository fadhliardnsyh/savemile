import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate';

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    afterChange: [revalidateCollection('/', 'layout')],
    afterDelete: [revalidateCollection('/', 'layout')],
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: './public/uploads',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
};
