import { User } from '../../../models/user.js'

export const resolvers = {
  Query: {
    users: async () => User.find(),
    user: async (_: unknown, args: { id: string }) => {
      return User.findById(args.id)
    },
  },
}
