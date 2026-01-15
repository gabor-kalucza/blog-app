import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { connectDB } from './db/connectDB.js'
import { expressMiddleware } from '@as-integrations/express5'
import {
  typeDefs,
  resolvers,
  GraphQLContext,
  buildContext,
} from './graphql/index.js'

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  formatError(formattedError) {
    return {
      message: formattedError.message,
      code: formattedError.extensions?.code,
    }
  },
})
const app = express()

await connectDB()
await server.start()

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, { context: buildContext })
)

app.listen(4000, () => {
  console.log('GraphQL server is running at http://localhost:4000/graphql')
})
