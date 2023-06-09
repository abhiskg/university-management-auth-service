import config from '../../../config'
import type { IUser } from './user.interface'
import User from './user.model'
import { generateUserId } from './user.utils'

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  // default password

  if (!user.password) {
    user.password = config.default_user_password
  }

  user.id = await generateUserId()

  const createUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create User!')
  }
  return createUser
}

export const UserService = { createUserToDB }
