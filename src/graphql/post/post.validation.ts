import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().optional(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
