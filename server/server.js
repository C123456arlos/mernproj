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





// import express from 'express'
// import 'dotenv/config'
// import cors from 'cors'
// import connectDB from './configs/db.js'
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from './controllers/clerkWebhooks.js'
// import userRouter from './routes/userRoutes.js'
// import hotelRouter from './routes/hotelRoutes.js'
// import connectCloudinary from './configs/cloudinary.js'
// import roomRouter from './routes/roomRoutes.js'
// import bookingRouter from './routes/bookingRoutes.js'
// import { stripeWebhooks } from './controllers/stripeWebhooks.js'
// import dns  from "node:dns/promises"
// dns.setServers(["1.1.1.1"])
// connectDB()
// connectCloudinary()


// const app = express()
// app.use(cors())
// app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)
// app.use(express.json())
// app.use(clerkMiddleware())
// app.use('/clerk', clerkWebhooks)

// app.get('/', (req, res) => res.send('server running'))
// app.use('/api/user', userRouter)
// app.use('/api/hotels', hotelRouter)
// app.use('/api/rooms', roomRouter)
// app.use('/api/bookings', bookingRouter)

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => console.log(`server running on port ${PORT}`))




// import express from 'express'
// import 'dotenv/config'
// import cors from 'cors'
// import connectDB from './configs/db.js'
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from './controllers/clerkWebhooks.js'
// import userRouter from './routes/userRoutes.js'
// import hotelRouter from './routes/hotelRoutes.js'
// import connectCloudinary from './configs/cloudinary.js'
// import roomRouter from './routes/roomRoutes.js'
// import bookingRouter from './routes/bookingRoutes.js'
// import { stripeWebhooks } from './controllers/stripeWebhooks.js'
// import dns  from "node:dns/promises"
// dns.setServers(["1.1.1.1"])
// connectDB()
// connectCloudinary()


// const app = express()
// app.use(cors())
// app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)
// app.use(express.json())
// app.use(clerkMiddleware())
// app.use('/clerk', clerkWebhooks)

// app.get('/', (req, res) => res.send('server running'))
// app.use('/api/user', userRouter)
// app.use('/api/hotels', hotelRouter)
// app.use('/api/rooms', roomRouter)
// app.use('/api/bookings', bookingRouter)

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => console.log(`server running on port ${PORT}`))


