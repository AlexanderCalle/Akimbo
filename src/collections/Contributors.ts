import { CollectionConfig } from 'payload'

const Contributors: CollectionConfig = {
  slug: 'contributors',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'bio', type: 'richText' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Contributors
