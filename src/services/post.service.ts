import { forbidden, notFound } from '../graphql/errors.js'
import { Post } from '../models/index.js'

export const deletePostById = async (
  postId: string,
  userId: string
): Promise<void> => {
  const post = await Post.findById(postId)

  if (!post) {
    throw notFound('Post not found')
  }

  if (post.authorId.toString() !== userId) {
    throw forbidden('Not authorized to delete this post')
  }

  await post.deleteOne()
}

export const updatePostById = async (
  postId: string,
  userId: string,
  input: {
    title?: string
    content?: string
    published?: boolean
  }
) => {
  const post = await Post.findById(postId)

  if (!post) {
    throw notFound('Post not found')
  }

  if (post.authorId.toString() !== userId) {
    throw forbidden('Not authorized to update this post')
  }

  if (input.title !== undefined) post.title = input.title
  if (input.content !== undefined) post.content = input.content
  if (input.published !== undefined) post.published = input.published

  await post.save()
  return post
}
