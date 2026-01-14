import mongoose from 'mongoose'
import { MONGO_URI } from '../config.js'

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
  } catch (err) {
    if (err instanceof Error) {
      console.error('MongoDB connection failed:', err.message)
    }
    process.exit(1)
  }
}
