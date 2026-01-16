import { User } from '../models/index.js'
import { notFound, forbidden } from '../graphql/errors.js'

export const createUser = async (input: { name: string; email: string }) => {
  return User.create(input)
}

export const updateUserById = async (
  userId: string,
  input: {
    name?: string
    email?: string
  }
) => {
  const user = await User.findById(userId)
  if (!user) throw notFound('User not found')

  Object.assign(user, input)
  await user.save()
  return user
}

export const deleteUserById = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw notFound('User not found')

  await user.deleteOne()
}
