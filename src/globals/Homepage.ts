import { GlobalConfig } from 'payload'

const Homepage: GlobalConfig = {
  slug: 'homepage',
  fields: [
    { name: 'heroTitle', type: 'text' },
    {
      name: 'featuredArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
  ],
}

export default Homepage
