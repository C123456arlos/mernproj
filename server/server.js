import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import dns  from "node:dns/promises"
import { clerkWebhooks } from './controllers/webhooks.js'
dns.setServers(["1.1.1.1"])
const app = express()
await connectDB()
app.use(cors())
app.get('/', (req, res) => res.send('app'))
app.post('/clerk', express.json(), clerkWebhooks)
// app.use('/clerk', clerkWebhooks)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})