import express from 'express'
import cors from 'cors'
import { typeDefs } from './graphql/schema/user/user.typeDefs.js'
import { resolvers } from './graphql/schema/user/user.resolvers.js'
import { ApolloServer } from '@apollo/server'
import { connectDB } from './db/connectDB.js'
import { expressMiddleware } from '@as-integrations/express5'

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

await connectDB()
await server.start()

app.use('/graphql', cors(), express.json(), expressMiddleware(server))

app.listen(4000, () => {
  console.log('GraphQL server is running at http://localhost:4000/graphql')
})
