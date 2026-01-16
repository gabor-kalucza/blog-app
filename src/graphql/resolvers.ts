import { resolvers as userResolvers } from './user/user.resolvers.js'
import { resolvers as postResolvers } from './post/post.resolvers.js'

export const resolvers = [userResolvers, postResolvers]
