import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate';

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  hooks: {
    afterChange: [revalidateGlobal('/company/about')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Tentang Kami',
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
      defaultValue: 'Halo SaveMile, saya ingin berkonsultasi mengenai perusahaan Anda.',
    },
    {
      name: 'storyTitle',
      type: 'text',
      defaultValue: 'Kami bukan sekadar distributor ban',
    },
    {
      name: 'storyTitleHighlight',
      type: 'text',
      label: 'Story Title Highlight Phrases (comma separated)',
      defaultValue: 'distributor ban',
    },
    {
      name: 'storyImage',
      type: 'relationship',
      relationTo: 'media',
      label: 'Story Image / Media',
    },
    {
      name: 'storyBody',
      type: 'array',
      fields: [
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'trustTitle',
      type: 'text',
      defaultValue: 'Dari BUMN hingga perusahaan swasta terkemuka di Indonesia',
    },
    {
      name: 'trustTitleHighlight',
      type: 'text',
      label: 'Trust Title Highlight Phrases (comma separated)',
      defaultValue: 'BUMN, perusahaan swasta terkemuka',
    },
    {
      name: 'trustBody',
      type: 'text',
      defaultValue: 'Mereka mempercayakan kebutuhan ban kendaraan mereka kepada SaveMile.',
    },
  ],
};
