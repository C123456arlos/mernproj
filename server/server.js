// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import { clerkMiddleware } from '@clerk/express'
// import connectDB from './configs/mongodb.js'
// import dns  from "node:dns/promises"
// import  clerkWebhooks  from './controllers/webhooks.js'
// dns.setServers(["1.1.1.1"])
// const app = express()
// await connectDB()
// app.use(cors())
// app.use(clerkMiddleware())
// app.get('/', (req, res) => res.send('app'))
// app.post('/clerk', express.json(), clerkWebhooks)
// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`)
// })



import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/webhooks.js'
import dns  from "node:dns/promises"
dns.setServers(["1.1.1.1"])
connectDB()



const app = express()
app.use(cors())

app.use(express.json())
app.use(clerkMiddleware())
app.use('/clerk', clerkWebhooks)

app.get('/', (req, res) => res.send('server running'))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))


