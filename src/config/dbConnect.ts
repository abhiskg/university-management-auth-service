import mongoose from 'mongoose'
import config from './index'

const dbConnect = () => {
  return mongoose.connect(config.mongo_uri, {
    dbName: 'university-management',
  })
}

export default dbConnect
