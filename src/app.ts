import cors from 'cors'
import express from 'express'
import { UserRoutes } from './app/modules/users/user.route'

const app = express()

app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api routes
app.use('/api/v1/users', UserRoutes)

export default app
