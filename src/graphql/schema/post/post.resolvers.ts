import { Post, User } from '../../../models/index.js'

export const resolvers = {
  Query: {
    posts: async () => Post.find(),
    post: async (_: unknown, args: { id: string }) => {
      return Post.findById(args.id)
    },
  },
  Post: {
    author: async (parent: { authorId: string }) => {
      return User.findById(parent.authorId)
    },
  },
}
