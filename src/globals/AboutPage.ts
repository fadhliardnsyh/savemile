import type { GlobalConfig } from 'payload';

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
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
      name: 'storyTitle',
      type: 'text',
      defaultValue: 'Kami bukan sekadar distributor ban',
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
      name: 'trustBody',
      type: 'text',
      defaultValue: 'Mereka mempercayakan kebutuhan ban kendaraan mereka kepada SaveMile.',
    },
  ],
};
