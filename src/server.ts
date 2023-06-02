import app from './app'
import config from './config'
import dbConnect from './config/dbConnect'

dbConnect()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Database connected and listing on port ${config.port}`)
    })
  })
  .catch(err => {
    console.log((err as Error).message)
  })
