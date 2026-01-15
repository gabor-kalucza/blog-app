import { User } from '../../models/index.js'

export const resolvers = {
  Query: {
    users: async () => User.find(),
    user: async (_: unknown, args: { id: string }) => {
      return User.findById(args.id)
    },
  },
}
