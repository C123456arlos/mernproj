import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js'
import userRouter from './routes/userRoutes.js'

import dns  from "node:dns/promises"
dns.setServers(["1.1.1.1"])
connectDB()



const app = express()
app.use(cors())

app.use(express.json())
app.use(clerkMiddleware())
app.use('/clerk', clerkWebhooks)

app.get('/', (req, res) => res.send('server running'))
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))


