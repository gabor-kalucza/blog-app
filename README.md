# Blog API

A backend API for a blog platform built with GraphQL, Node.js, Express, and MongoDB Atlas.

The API follows a clean and modular architecture and is designed to handle user management, post creation, and authorization logic in a scalable and maintainable way.

---

## What this project does

The API provides functionality for managing users and blog posts. It exposes a GraphQL interface that allows clients to create, update, delete, and query posts while enforcing authentication and authorization rules on the server.

The application is backend-only and is intended to be consumed by a client such as a web or mobile application.

---

## Features

User management  
Create users with validated input  
Prevent duplicate user emails  
Fetch users and user details

Post management  
Create posts as an authenticated user  
Update posts only if you are the author  
Delete posts only if you are the author  
Fetch all posts or a single post

Authentication and authorization  
Request-level authentication using GraphQL context  
Authorization guards for protected mutations  
Users can only modify their own posts

Validation and error handling  
Input validation using Zod  
Consistent GraphQL error responses  
Clear error codes for common failure cases

---

## Technologies used

Node.js  
TypeScript  
Express  
Apollo Server  
GraphQL  
MongoDB Atlas  
Mongoose  
Zod  
dotenv

---

The codebase is organized to keep responsibilities clearly separated.  
Resolvers handle GraphQL logic, services manage database operations, validation occurs at the API boundary, and authentication logic is centralized.

---

## Database

The application uses MongoDB Atlas as its database.

All data is stored in a cloud-hosted MongoDB cluster, which allows the API to run independently of local database instances and aligns with common production deployment practices.

Database connection details are provided through environment variables.

---

## Authentication model

Authentication is handled through the GraphQL context.

Each request reads the Authorization header.  
If present, user information is attached to the request context.  
Protected mutations require authentication and enforce ownership checks.

The authentication model is intentionally minimal and focuses on request context and authorization flow rather than token lifecycle management.

---

## Validation approach

All mutation inputs are validated using Zod schemas before any database operation is performed.

Validation errors are converted into structured GraphQL errors to provide clear and consistent feedback to API consumers.
