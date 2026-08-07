import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate';

export const SuccessStoryPage: GlobalConfig = {
  slug: 'success-story-page',
  hooks: {
    afterChange: [revalidateGlobal('/insight/success-story')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title (SEO)',
      defaultValue: 'Success Story',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      label: 'SEO Description',
      defaultValue:
        'Cerita nyata armada yang berhenti menebak dan mulai mengelola ban berbasis data bersama SaveMile.',
    },
    {
      name: 'heroEyebrow',
      type: 'text',
      defaultValue: 'Success Story',
    },
    {
      name: 'heroTitleLead',
      type: 'text',
      label: 'Hero Title (lead text)',
      defaultValue: 'Terbukti di ',
    },
    {
      name: 'heroTitleAccent',
      type: 'text',
      label: 'Hero Title (accent / highlighted text)',
      defaultValue: 'lapangan',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        'Hasil nyata dari armada yang berhenti menebak dan mulai mengelola ban berbasis data.',
    },
    {
      name: 'heroMedia',
      type: 'relationship',
      relationTo: 'media',
      label: 'Hero Media (Image or Video)',
    },
  ],
};
