import type { CollectionConfig } from 'payload';

export const WhatsAppClicks: CollectionConfig = {
  slug: 'whatsapp-clicks',
  labels: {
    singular: 'WhatsApp Click',
    plural: 'WhatsApp Clicks',
  },
  admin: {
    useAsTitle: 'buttonLocation',
    defaultColumns: ['buttonLocation', 'page', 'device', 'createdAt'],
    group: 'Analytics',
    description: 'Log of user clicks on WhatsApp buttons across the website.',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'buttonLocation',
      type: 'text',
      label: 'Button Location',
      required: true,
      index: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'page',
      type: 'text',
      label: 'Page URL',
      required: true,
      index: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Button Label',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'targetUrl',
      type: 'text',
      label: 'WhatsApp Target URL',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'device',
      type: 'select',
      label: 'Device',
      options: [
        { label: 'Mobile', value: 'mobile' },
        { label: 'Tablet', value: 'tablet' },
        { label: 'Desktop', value: 'desktop' },
        { label: 'Unknown', value: 'unknown' },
      ],
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'browser',
      type: 'text',
      label: 'Browser',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'os',
      type: 'text',
      label: 'Operating System',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'referrer',
      type: 'text',
      label: 'Referrer',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'utmSource',
      type: 'text',
      label: 'UTM Source',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'utmMedium',
      type: 'text',
      label: 'UTM Medium',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'utmCampaign',
      type: 'text',
      label: 'UTM Campaign',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'ip',
      type: 'text',
      label: 'IP Address',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
      admin: {
        readOnly: true,
      },
    },
  ],
};
