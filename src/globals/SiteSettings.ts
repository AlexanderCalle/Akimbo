import { GlobalConfig } from 'payload'

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'siteName', type: 'text', required: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'footerText', type: 'richText' },
  ],
}

export default SiteSettings
