import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate';

export const TmsPage: GlobalConfig = {
  slug: 'tms-page',
  hooks: {
    afterChange: [revalidateGlobal('/solusi/tire-monitoring-system')],
  },
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
      name: 'whatsappMessage',
      type: 'textarea',
      label: 'WhatsApp CTA Message Template',
      defaultValue: 'Halo SaveMile, saya ingin tahu lebih lanjut mengenai Tire Management Solution (TMS).',
    },
    {
      name: 'howTitle',
      type: 'text',
      label: 'How It Works Section Title',
      defaultValue: 'Kelola ban dari awal hingga akhir dalam satu sistem',
    },
    {
      name: 'howHighlight',
      type: 'text',
      label: 'How It Works Highlight Phrases (comma separated)',
      defaultValue: 'satu sistem',
    },
    {
      name: 'howDescription',
      type: 'textarea',
      label: 'How It Works Description',
      defaultValue: 'SaveMile menghubungkan setiap tahap, dari pemasangan sampai pengakhiran, dalam satu alur yang saling terhubung.',
    },
    {
      name: 'howSteps',
      type: 'array',
      label: 'How It Works Steps',
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
          name: 'icon',
          type: 'select',
          label: 'Step Icon',
          options: [
            { label: 'Laser (Identity)', value: 'laser' },
            { label: 'Wrench (Maintenance)', value: 'wrench' },
            { label: 'Search (Inspection)', value: 'search' },
            { label: 'Bell (Notification)', value: 'bell' },
            { label: 'Leaf (Eco)', value: 'leaf' },
            { label: 'Consult (Analytics/Chart)', value: 'consult' },
            { label: 'Route (Track/Km)', value: 'route' },
            { label: 'Shield (Protection)', value: 'shield' },
            { label: 'Bolt (Speed/Alert)', value: 'bolt' },
            { label: 'Bulb (Idea/Smart)', value: 'bulb' },
            { label: 'Truck (Fleet)', value: 'truck' },
            { label: 'Tire (Tire)', value: 'tire' },
            { label: 'Target (Goal)', value: 'target' },
            { label: 'Badge (Quality)', value: 'badge' },
          ],
          defaultValue: 'laser',
        },
      ],
    },
    {
      name: 'featuresTitle',
      type: 'text',
      label: 'Features Section Title',
      defaultValue: 'Kendali penuh atas ban armada, berbasis data',
    },
    {
      name: 'featuresHighlight',
      type: 'text',
      label: 'Features Highlight Phrases (comma separated)',
      defaultValue: 'berbasis data',
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
          name: 'icon',
          type: 'select',
          label: 'Item Icon',
          options: [
            { label: 'Laser (Identity)', value: 'laser' },
            { label: 'Route (Track/Km)', value: 'route' },
            { label: 'Bell (Notification)', value: 'bell' },
            { label: 'Consult (Analytics/Chart)', value: 'consult' },
            { label: 'Shield (Protection)', value: 'shield' },
            { label: 'Bolt (Speed/Alert)', value: 'bolt' },
            { label: 'Bulb (Idea/Smart)', value: 'bulb' },
            { label: 'Wrench (Maintenance)', value: 'wrench' },
            { label: 'Leaf (Eco)', value: 'leaf' },
            { label: 'Truck (Fleet)', value: 'truck' },
            { label: 'Tire (Tire)', value: 'tire' },
            { label: 'Target (Goal)', value: 'target' },
            { label: 'Badge (Quality)', value: 'badge' },
          ],
          defaultValue: 'consult',
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
