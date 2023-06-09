import type { RequestHandler } from 'express'
import { UserService } from './user.service'

const createNewUser: RequestHandler = async (req, res) => {
  const user = req.body

  try {
    const result = await UserService.createUserToDB(user)

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    })
  }
}

export const UserController = { createNewUser }
