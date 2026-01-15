export const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    published: Boolean
  }
  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }
  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }
  input CreatePostInput {
    title: String!
    content: String!
    published: Boolean
  }
`
