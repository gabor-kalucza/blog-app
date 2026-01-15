export const typeDefs = `#graphql 
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User
  }
  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
  input CreateUserInput {
    name: String!
    email: String!
  }
`
