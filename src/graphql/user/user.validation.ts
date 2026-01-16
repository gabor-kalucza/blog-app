import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export const updateUserSchema = z.object({
  id: z.string(),
  input: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
  }),
})

export const deleteUserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>['input']
