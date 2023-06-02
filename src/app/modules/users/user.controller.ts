import { Request, Response } from 'express'
import { createUserToDB } from './user.service'

const createNewUser = async (req: Request, res: Response) => {
  const { user } = req.body

  try {
    const result = await createUserToDB(user)

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

export { createNewUser }
