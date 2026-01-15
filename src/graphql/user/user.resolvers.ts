import { ZodError } from 'zod'
import { User } from '../../models/index.js'
import { CreateUserInput, createUserSchema } from './user.validation.js'
import { GraphQLError } from 'graphql'

export const resolvers = {
  Query: {
    users: async () => User.find().lean(),
    user: async (_: unknown, args: { id: string }) => {
      return User.findById(args.id).lean()
    },
  },
  Mutation: {
    async createUser(_: unknown, args: { input: unknown }) {
      try {
        const input: CreateUserInput = createUserSchema.parse(args.input)
        const isUserEmailExists = await User.exists({ email: input.email })

        if (isUserEmailExists) {
          throw new GraphQLError('Email already in use', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          })
        }

        return await User.create({
          name: input.name,
          email: input.email,
        })
      } catch (err) {
        if (err instanceof ZodError) {
          throw new GraphQLError('Validation failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              fieldErrors: err.flatten().fieldErrors,
            },
          })
        }

        throw err
      }
    },
  },
}
