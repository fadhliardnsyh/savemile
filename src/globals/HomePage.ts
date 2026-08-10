import type { GlobalConfig } from 'payload';
import { coverage, stats } from '../lib/content';
import { revalidateGlobal } from '../hooks/revalidate';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  hooks: {
    afterChange: [revalidateGlobal('/')],
  },
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
      name: 'whatsappMessage',
      type: 'textarea',
      label: 'WhatsApp CTA Message Template',
      defaultValue: 'Halo SaveMile, saya ingin berkonsultasi mengenai ban untuk armada saya.',
    },
    {
      name: 'clientsTitle',
      type: 'text',
      label: 'Clients Section Title',
      defaultValue: 'Dipercaya oleh klien dan mitra industri',
    },
    {
      name: 'clientsTitleHighlight',
      type: 'text',
      label: 'Clients Title Highlight Phrases (comma separated)',
      defaultValue: 'klien, mitra industri',
    },
    {
      name: 'clientsBody',
      type: 'textarea',
      label: 'Clients Section Subtitle / Body',
      defaultValue: 'Dari BUMN hingga perusahaan swasta terbaik di Indonesia memilih SaveMile.',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats Section Items',
      defaultValue: stats as unknown as Record<string, unknown>[],
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Value / Number (e.g. 10.000+, 99%)',
          required: true,
        },
        {
          name: 'label',
          type: 'textarea',
          label: 'Description / Label',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'tire',
          options: [
            { label: 'Tire', value: 'tire' },
            { label: 'Shield', value: 'shield' },
            { label: 'Pin / Location', value: 'pin' },
            { label: 'Consult', value: 'consult' },
            { label: 'Laser', value: 'laser' },
            { label: 'Bell', value: 'bell' },
            { label: 'Wrench', value: 'wrench' },
            { label: 'Search', value: 'search' },
            { label: 'Leaf', value: 'leaf' },
            { label: 'Route', value: 'route' },
          ],
        },
      ],
    },
    {
      name: 'whyChooseTitle',
      type: 'text',
    },
    {
      name: 'whyChooseTitleHighlight',
      type: 'text',
      label: 'Why Choose Title Highlight Phrases (comma separated)',
      defaultValue: 'pengguna',
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
    {
      name: 'coverageTitle',
      type: 'text',
      label: 'Coverage Section Title',
      defaultValue: 'Jangkauan layanan kami sampai di seluruh Indonesia',
    },
    {
      name: 'coverageTitleHighlight',
      type: 'text',
      label: 'Coverage Title Highlight Phrases (comma separated)',
      defaultValue: 'seluruh Indonesia',
    },
    {
      name: 'coverageBody',
      type: 'textarea',
      label: 'Coverage Subtitle / Body',
      defaultValue: 'Team SaveMile siap mendukung operasional Anda dari Sabang sampai Merauke',
    },
    {
      name: 'coverageStats',
      type: 'array',
      label: 'Coverage Key Statistics',
      defaultValue: coverage.stats as unknown as Record<string, unknown>[],
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'coverageBranches',
      type: 'json',
      label: 'Coverage Branches & Map Pins',
      defaultValue: coverage.branches,
      admin: {
        components: {
          Field: '@/components/admin/MapPicker#MapPicker',
        },
      },
    },
  ],
};
