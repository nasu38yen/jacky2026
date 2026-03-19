import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const bmopSchema = z.object({
  // optional human-friendly slug (defaults to filename if omitted)
  slug: z.string().optional(),
  parent: z.string().optional(),
  author: z.string().nonempty(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
    }),

    bmop: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: bmopSchema
    }),
  },
})
