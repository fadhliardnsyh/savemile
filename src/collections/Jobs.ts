import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../hooks/revalidate';

const revalidateJobs = revalidateCollection('/company/career');

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  hooks: {
    afterChange: [revalidateJobs],
    afterDelete: [revalidateJobs],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'type', 'isActive'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Job Title',
    },
    {
      name: 'department',
      type: 'text',
      required: true,
      label: 'Department',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      defaultValue: 'Jakarta, Indonesia',
      label: 'Location',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'Full-time' },
        { label: 'Contract', value: 'Contract' },
        { label: 'Internship', value: 'Internship' },
      ],
      defaultValue: 'Full-time',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Job Description',
    },
    {
      name: 'applyUrl',
      type: 'text',
      label: 'Application Link or Email (e.g. mailto:hr@savemile.id)',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active Listing',
    },
  ],
};
