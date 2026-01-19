# Blog API

A backend API for a blog platform built with **GraphQL, Node.js, Express, TypeScript, and MongoDB Atlas**.

This project demonstrates a clean and modular GraphQL backend architecture with proper separation of concerns, validation, and authorization logic. The API is backend-only and intended to be consumed by a web or mobile client.

---

## Features

### User management

- Create users with validated input
- Prevent duplicate user emails
- Fetch all users or a single user

### Post management

- Create posts as an authenticated user
- Update posts only if you are the author
- Delete posts only if you are the author
- Fetch all posts or a single post

### Authentication & authorization

- Request-level authentication using GraphQL context
- Authorization guards for protected mutations
- Users can only modify their own posts

### Validation & error handling

- Input validation using **Zod**
- Structured GraphQL errors
- Clear error codes (`UNAUTHENTICATED`, `FORBIDDEN`, `BAD_USER_INPUT`, `NOT_FOUND`)

---

## Tech Stack

- Node.js
- TypeScript
- Express
- Apollo Server
- GraphQL
- MongoDB Atlas
- Mongoose
- Zod
- dotenv

---

## Project Structure

```
src/
├── graphql/
│   ├── context.ts
│   ├── errors.ts
│   ├── guards.ts
│   ├── resolvers.ts
│   ├── schema.ts
│   ├── user/
│   └── post/
├── models/
├── services/
├── config.ts
├── server.ts
```

- **Resolvers** handle GraphQL logic
- **Services** manage database operations
- **Validation** occurs at the API boundary
- **Authentication** is centralized in the GraphQL context

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/blog-api.git
cd blog-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Create environment variables**

```bash
cp .env.example .env
```

4. **Fill in your `.env` file**

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blog
PORT=8080
```

5. **Run the development server**

```bash
npm run dev
```

The API will be available at:

```
http://localhost:8080/graphql
```

---

## Environment Variables

This repository does **not** include a `.env` file.

You must provide your own MongoDB connection string.

### `.env.example`

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
PORT=8080
```

---

## Database

The API uses **MongoDB Atlas** by default.

To run the project, you should:

1. Create your own MongoDB cluster
2. Create a database user
3. Whitelist your IP address
4. Use the provided connection string in `.env`

### Local MongoDB (optional)

```env
MONGO_URI=mongodb://localhost:27017/blog
```

---

## How to Interact With the API

### GraphQL Playground (Built-in)

This API uses **Apollo Server**, which provides an interactive GraphQL IDE out of the box.

After starting the server, open your browser at:

```
http://localhost:8080/graphql
```

You can:

- Explore the schema
- Run queries and mutations
- View available types and inputs
- Test authorization logic

This replaces the need for Swagger, which is designed for REST APIs.

---

### Example Queries

#### Fetch all posts

```graphql
query {
  posts {
    id
    title
    published
    author {
      name
    }
  }
}
```

---

### Example Mutations

#### Create a user

```graphql
mutation {
  createUser(input: { name: "Alice", email: "alice@example.com" }) {
    id
    name
  }
}
```

#### Create a post (authenticated)

Add this HTTP header:

```
Authorization: Bearer <userId>
```

```graphql
mutation {
  createPost(
    input: { title: "Hello World", content: "My first post", published: true }
  ) {
    id
    title
  }
}
```

---

## Authentication Model

Authentication is handled via the **GraphQL context** and is required **only for protected mutations**.

- Queries are public and do not require authentication
- Mutations that modify data require authentication
- Ownership checks are enforced for update and delete operations

Each request reads the `Authorization` header. If present, the user ID is attached to the request context.

```
Authorization: Bearer <userId>
```

⚠️ **Note:**
This authentication model is intentionally minimal and **not production-ready**.
It focuses on authorization flow rather than token signing or lifecycle management.

---

## Scripts

```bash
npm run dev     # Start development server
npm run build   # Build TypeScript
npm start       # Run production build
```

---
