import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { connectDB } from './db/connectDB.js'
import { expressMiddleware } from '@as-integrations/express5'
import { typeDefs, resolvers } from './graphql/schema/index.js'
import { GraphQLContext } from './graphql/context.js'

const server = new ApolloServer<GraphQLContext>({ typeDefs, resolvers })
const app = express()

await connectDB()
await server.start()

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        return { user: null }
      }

      const userId = authHeader.replace('Bearer ', '')

      return {
        user: { id: userId },
      }
    },
  })
)

app.listen(4000, () => {
  console.log('GraphQL server is running at http://localhost:4000/graphql')
})
