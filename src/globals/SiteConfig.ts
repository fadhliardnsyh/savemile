import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate';

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  hooks: {
    afterChange: [revalidateGlobal('/', 'layout')],
  },
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
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Menu Groups',
      labels: {
        singular: 'Menu Group',
        plural: 'Menu Groups',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Group Label (e.g. Solution, Insight, Company)',
        },
        {
          name: 'children',
          type: 'array',
          label: 'Submenu Items',
          labels: {
            singular: 'Submenu Item',
            plural: 'Submenu Items',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Menu Title',
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              label: 'Link URL (e.g. /solusi/ban)',
            },
            {
              name: 'desc',
              type: 'textarea',
              label: 'Description / Subtext',
            },
          ],
        },
      ],
    },
  ],
};
