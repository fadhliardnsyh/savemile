import type { GlobalConfig } from 'payload';

export const TmsPage: GlobalConfig = {
  slug: 'tms-page',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Tire Management Solution',
    },
    {
      name: 'heroMedia',
      type: 'relationship',
      relationTo: 'media',
      label: 'Hero Media (Image or Video)',
    },
    {
      name: 'featuresTitle',
      type: 'text',
      label: 'Features Section Title',
      defaultValue: 'Kendali penuh atas ban armada, berbasis data',
    },
    {
      name: 'featureItems',
      type: 'array',
      label: 'Feature Deep Dive Items',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'desc',
          type: 'textarea',
        },
        {
          name: 'media',
          type: 'relationship',
          relationTo: 'media',
          label: 'Feature Media (Image or Video)',
        },
      ],
    },
    {
      name: 'consultationTitle',
      type: 'text',
      label: 'Consultation Section Title',
      defaultValue: 'Konsultasi berkualitas secara berkala, berbasis data',
    },
    {
      name: 'consultationHighlight',
      type: 'text',
      label: 'Consultation Highlight Phrases (comma separated)',
      defaultValue: 'berbasis data',
    },
    {
      name: 'consultationDescription',
      type: 'textarea',
      label: 'Consultation Description',
      defaultValue: 'Kami selalu memberikan konsultasi laporan CPK ban untuk memastikan setiap ban yang Anda gunakan konsisten sesuai standar kualitas dan performa terbaik.',
    },
    {
      name: 'consultationMedia',
      type: 'relationship',
      relationTo: 'media',
      label: 'Consultation Media (Image or Video)',
    },
  ],
};
