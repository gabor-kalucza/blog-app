import express, { type Request, type Response } from 'express'
import { connectDB } from './db/connectDB.js'
import { PORT } from './config.js'

const app = express()
app.use(express.json())

await connectDB()

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is running ' })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
