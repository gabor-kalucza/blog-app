import { Post, User } from '../../../models/index.js'
import { GraphQLContext } from '../../context.js'

interface CreatePostArgs {
  input: {
    title: string
    content: string
    published?: boolean
  }
}

export const resolvers = {
  Query: {
    posts: async () => Post.find(),
    post: async (_: unknown, args: { id: string }) => {
      return Post.findById(args.id)
    },
  },
  Mutation: {
    createPost(_: unknown, args: CreatePostArgs, context: GraphQLContext) {
      if (!context.user) {
        throw new Error('Not authenticated')
      }

      return Post.create({
        title: args.input.title,
        content: args.input.content,
        authorId: context.user.id,
        published: args.input.published,
      })
    },
  },
  Post: {
    author: async (parent: { authorId: string }) => {
      return User.findById(parent.authorId)
    },
  },
}
