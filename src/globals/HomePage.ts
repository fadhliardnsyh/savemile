import type { GlobalConfig } from 'payload';
import { coverage } from '../lib/content';
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
    {
      name: 'coverageTitle',
      type: 'text',
      label: 'Coverage Section Title',
      defaultValue: 'Jangkauan layanan kami sampai di seluruh Indonesia',
    },
    {
      name: 'coverageAccent',
      type: 'text',
      label: 'Coverage Title Accent Text (highlighted in orange)',
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
