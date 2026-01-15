import { resolvers as userResolvers } from './user/user.resolvers.js'
import { resolvers as postResolvers } from './post/post.resolvers.js'
import { typeDefs as userTypeDefs } from './user/user.typeDefs.js'
import { typeDefs as postTypeDefs } from './post/post.typeDefs.js'

export { createPostSchema, CreatePostInput } from './post/post.validation.js'
export { buildContext } from './context.js'
export { GraphQLContext } from './context.js'
export const typeDefs = [userTypeDefs, postTypeDefs]
export const resolvers = [userResolvers, postResolvers]
