import { ZodError } from 'zod'
import { Post, User } from '../../models/index.js'
import { GraphQLContext } from '../context.js'
import {
  CreatePostInput,
  createPostSchema,
  deletePostSchema,
  updatePostSchema,
} from './post.validation.js'
import { requireAuth } from '../guards.js'
import { validationError, notFound } from '../errors.js'
import { deletePostById, updatePostById } from '../../services/post.service.js'

export const resolvers = {
  Query: {
    posts: async () => Post.find().lean(),
    post: async (_: unknown, args: { id: string }) => Post.findById(args.id),
  },

  Mutation: {
    async createPost(
      _: unknown,
      args: { input: unknown },
      context: GraphQLContext
    ): Promise<CreatePostInput> {
      const user = requireAuth(context)

      try {
        const input: CreatePostInput = createPostSchema.parse(args.input)

        const author = await User.findById(user.id)
        if (!author) {
          throw notFound('User not found')
        }

        return Post.create({
          title: input.title,
          content: input.content,
          authorId: user.id,
          published: input.published,
        })
      } catch (err) {
        if (err instanceof ZodError) {
          throw validationError(err)
        }
        throw err
      }
    },

    async deletePost(
      _: unknown,
      args: { id: string },
      context: GraphQLContext
    ): Promise<boolean> {
      const user = requireAuth(context)

      try {
        const { id } = deletePostSchema.parse(args)
        await deletePostById(id, user.id)
        return true
      } catch (err) {
        if (err instanceof ZodError) {
          throw validationError(err)
        }
        throw err
      }
    },

    async updatePost(_: unknown, args: unknown, context: GraphQLContext) {
      const user = requireAuth(context)

      try {
        const { id, input } = updatePostSchema.parse(args)
        return await updatePostById(id, user.id, input)
      } catch (err) {
        if (err instanceof ZodError) {
          throw validationError(err)
        }
        throw err
      }
    },
  },

  Post: {
    author: async (parent: { authorId: string }) =>
      User.findById(parent.authorId),
  },
}
