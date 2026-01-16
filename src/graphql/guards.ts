import { GraphQLContext } from './context.js'
import { unauthenticated } from './errors.js'

export const requireAuth = (context: GraphQLContext) => {
  if (!context.user) {
    throw unauthenticated()
  }
  return context.user
}
