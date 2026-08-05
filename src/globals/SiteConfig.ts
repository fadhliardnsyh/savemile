import type { GlobalConfig } from 'payload';

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  fields: [
    {
      name: 'name',
      type: 'text',
      defaultValue: 'SaveMile',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Pilih ban yang tepat, kelola lebih cerdas.',
    },
    {
      name: 'blurb',
      type: 'textarea',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'hrEmail',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'whatsapp',
      type: 'text',
    },
    {
      name: 'whatsappMessage',
      type: 'textarea',
      label: 'Default WhatsApp Message Template',
      defaultValue: 'Halo SaveMile, saya ingin berkonsultasi mengenai ban armada.',
    },
    {
      name: 'address',
      type: 'textarea',
    },
  ],
};
