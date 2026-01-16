import { ZodError } from 'zod'
import { User } from '../../models/index.js'
import {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from './user.validation.js'
import {
  createUser,
  updateUserById,
  deleteUserById,
} from '../../services/user.service.js'
import { validationError } from '../errors.js'

export const resolvers = {
  Query: {
    users: async () => User.find().lean(),
    user: async (_: unknown, args: { id: string }) =>
      User.findById(args.id).lean(),
  },

  Mutation: {
    async createUser(_: unknown, args: { input: unknown }) {
      try {
        const input = createUserSchema.parse(args.input)
        return createUser(input)
      } catch (err) {
        if (err instanceof ZodError) throw validationError(err)
        throw err
      }
    },

    async updateUser(_: unknown, args: unknown) {
      try {
        const { id, input } = updateUserSchema.parse(args)
        return updateUserById(id, input)
      } catch (err) {
        if (err instanceof ZodError) throw validationError(err)
        throw err
      }
    },

    async deleteUser(_: unknown, args: unknown) {
      try {
        const { id } = deleteUserSchema.parse(args)
        await deleteUserById(id)
        return true
      } catch (err) {
        if (err instanceof ZodError) throw validationError(err)
        throw err
      }
    },
  },
}
