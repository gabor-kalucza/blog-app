import { GraphQLError } from 'graphql'
import { Post, User } from '../../models/index.js'
import {
  GraphQLContext,
  CreatePostInput,
  createPostSchema,
} from './../index.js'
import { ZodError } from 'zod'

export const resolvers = {
  Query: {
    posts: async () => Post.find().lean(),
    post: async (_: unknown, args: { id: string }) => {
      return Post.findById(args.id)
    },
  },
  Mutation: {
    async createPost(
      _: unknown,
      args: { input: unknown },
      context: GraphQLContext
    ) {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }

      try {
        const input: CreatePostInput = createPostSchema.parse(args.input)
        const author = await User.findById(context.user.id)

        if (!author) {
          throw new GraphQLError('User not found', {
            extensions: { code: 'FORBIDDEN' },
          })
        }

        return Post.create({
          title: input.title,
          content: input.content,
          authorId: context.user.id,
          published: input.published,
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
  Post: {
    author: async (parent: { authorId: string }) => {
      const user = await User.findById(parent.authorId)

      if (!user) {
        throw new GraphQLError('Author not found', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        })
      }

      return user
    },
  },
}
