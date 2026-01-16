import { GraphQLError } from 'graphql'
import { ZodError } from 'zod'

export const unauthenticated = () =>
  new GraphQLError('Not authenticated', {
    extensions: { code: 'UNAUTHENTICATED' },
  })

export const forbidden = (message = 'Forbidden') =>
  new GraphQLError(message, {
    extensions: { code: 'FORBIDDEN' },
  })

export const notFound = (message = 'Not found') =>
  new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  })

export const validationError = (err: ZodError) =>
  new GraphQLError('Validation failed', {
    extensions: {
      code: 'BAD_USER_INPUT',
      fieldErrors: err.flatten().fieldErrors,
    },
  })
