import express from 'express'
import { createNewUser } from './user.controller'

const router = express.Router()

router.post('/create-user', createNewUser)

export default router
