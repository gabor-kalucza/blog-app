import { Request } from 'express'

export interface GraphQLContext {
  user: { id: string } | null
}

export const buildContext = async ({
  req,
}: {
  req: Request
}): Promise<GraphQLContext> => {
  const authHeader = req.headers.authorization
  if (!authHeader) return { user: null }

  return {
    user: { id: authHeader.replace('Bearer ', '') },
  }
}
