import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().optional(),
})

export const deletePostSchema = z.object({
  id: z.string().min(1, 'Post ID is required'),
})

export const updatePostSchema = z.object({
  id: z.string().min(1),
  input: z
    .object({
      title: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
      published: z.boolean().optional(),
    })
    .refine(
      (data) =>
        data.title !== undefined ||
        data.content !== undefined ||
        data.published !== undefined,
      { message: 'At least one field must be provided' }
    ),
})

export type DeletePostInput = z.infer<typeof deletePostSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
