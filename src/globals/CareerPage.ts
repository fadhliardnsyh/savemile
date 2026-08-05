import type { GlobalConfig } from 'payload';

export const CareerPage: GlobalConfig = {
  slug: 'career-page',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title (SEO)',
      defaultValue: 'Karir',
    },
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Wujudkan karir impian bersama SaveMile',
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
      name: 'valuesTitle',
      type: 'text',
      defaultValue: 'Nilai yang membentuk cara kami bekerja',
    },
    {
      name: 'valuesTitleHighlight',
      type: 'text',
      defaultValue: 'cara kami bekerja',
    },
    {
      name: 'valuesBody',
      type: 'textarea',
    },
    {
      name: 'valuesItems',
      type: 'array',
      label: 'Values Cards',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'desc',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Target', value: 'target' },
            { label: 'Bulb', value: 'bulb' },
            { label: 'Bolt', value: 'bolt' },
            { label: 'Badge', value: 'badge' },
            { label: 'Growth', value: 'growth' },
            { label: 'Heart', value: 'heart' },
          ],
          defaultValue: 'target',
        },
      ],
    },
    {
      name: 'ctaTitle',
      type: 'text',
      defaultValue: 'Tertarik bergabung dengan tim SaveMile?',
    },
    {
      name: 'ctaTitleHighlight',
      type: 'text',
      defaultValue: 'SaveMile',
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
    },
    {
      name: 'ctaActionText',
      type: 'text',
      defaultValue: 'Kirim Lamaran Anda',
    },
    {
      name: 'ctaActionUrl',
      type: 'text',
      defaultValue: 'mailto:hr@savemile.id',
    },
  ],
};
