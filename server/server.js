// import express from 'express'
// import 'dotenv/config'
// import cors from 'cors'
// import connectDB from './configs/db.js'
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks, { stripeWebhooks } from './controllers/clerkWebhooks.js'
// import userRouter from './routes/userRoute.js'
// import dns  from "node:dns/promises"
// import educatorRouter from './routes/educatorRoute.js'
// import connectCloudinary from './configs/cloudinary.js'
// import courseRouter from './routes/courseRoute.js'
// import userAuthRouter from './routes/userRoutes.js'
// dns.setServers(["1.1.1.1"])
// connectDB()
// await connectCloudinary()


// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use(clerkMiddleware())
// // app.use('/clerk', express.json(),clerkWebhooks)
// app.use('/clerk', clerkWebhooks)
// app.use('/api/educator', express.json(), educatorRouter)
// app.use('/api/course', express.json(), courseRouter)
// app.get('/', (req, res) => res.send('server running'))
// // app.use('/api/user', educatorRouter)
// // app.use('/api/user', protect)
// app.use('/api/user', userRouter)
// app.use('/api/user', userAuthRouter)
// app.post('/stripe', express.raw({type:'application/json'}), stripeWebhooks)

// app.use('/api/user', userRouter)

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => console.log(`server running on port ${PORT}`))





import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks, { stripeWebhooks } from './controllers/clerkWebhooks.js'
import userRouter from './routes/userRoute.js'
import dns  from "node:dns/promises"
import educatorRouter from './routes/educatorRoute.js'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userAuthRouter from './routes/userRoutes.js'
dns.setServers(["1.1.1.1"])
connectDB()
await connectCloudinary()


const app = express()
app.use('/stripe', express.raw({type:'application/json'}), stripeWebhooks)
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
// app.use('/clerk', express.json(),clerkWebhooks)
app.use('/clerk', clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.get('/', (req, res) => res.send('server running'))
// app.use('/api/user', educatorRouter)
// app.use('/api/user', protect)
app.use('/api/user', userRouter)
app.use('/api/user', userAuthRouter)
// app.use('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))









// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './configs/db.js'
// import { clerkMiddleware } from '@clerk/express'
// import dns from "node:dns/promises"
// import { serve } from 'inngest/express'
// import { inngest, functions } from './inngest/index.js'
// import showRouter from './routes/showRoutes.js'
// import bookingRouter from './routes/bookingRoutes.js'
// import adminRouter from './routes/adminRoutes.js'
// import userRouter from './routes/userRoutes.js'
// import { stripeWebhooks } from './controllers/stripeWebhooks.js'
// const app = express()
// const port = 3000
// dns.setServers(["1.1.1.1"])
// await connectDB()

// app.use('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// app.use(express.json())
// app.use(cors())
// app.use(clerkMiddleware())

// app.get('/', (req, res) => res.send('server is live'))
// // app.use('/api/inngest', serve({ client: inngest, functions }))
// app.use('/api/show', showRouter)
// app.use('/api/booking', bookingRouter)
// app.use('/api/admin', adminRouter)
// app.use('/api/user', userRouter)

// app.listen(port, () => console.log(`server listening ${port}`))































































// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './configs/db.js'
// import { clerkMiddleware } from '@clerk/express'
// import dns from "node:dns/promises"
// import { serve } from 'inngest/express'
// import { inngest, functions } from './inngest/index.js'
// import showRouter from './routes/showRoutes.js'
// import bookingRouter from './routes/bookingRoutes.js'
// import adminRouter from './routes/adminRoutes.js'
// import userRouter from './routes/userRoutes.js'
// import { stripeWebhooks } from './controllers/stripeWebhooks.js'
// const app = express()
// const port = 3000
// dns.setServers(["1.1.1.1"])
// await connectDB()

// app.use('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// app.use(express.json())
// app.use(cors())
// app.use(clerkMiddleware())

// app.get('/', (req, res) => res.send('server is live'))
// app.use('/api/inngest', serve({ client: inngest, functions }))
// app.use('/api/show', showRouter)
// app.use('/api/booking', bookingRouter)
// app.use('/api/admin', adminRouter)
// app.use('/api/user', userRouter)

// app.listen(port, () => console.log(`server listening ${port}`))








// import express from 'express'
// import 'dotenv/config'
// import cors from 'cors'
// import connectDB from './configs/db.js'
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from './controllers/clerkWebhooks.js'
// import userAuthRouter from './routes/userAuthRoute.js'
// import dns  from "node:dns/promises"
// import educatorRouter from './routes/educatorRoute.js'
// import userRouter from './routes/userRoute.js'
// import { protect } from './middleware/protect.js'
// import connectCloudinary from './configs/cloudinary.js'
// import courseRouter from './routes/courseRoute.js'
// dns.setServers(["1.1.1.1"])
// connectDB()
// await connectCloudinary()


// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use(clerkMiddleware())
// // app.use('/clerk', express.json(),clerkWebhooks)
// app.use('/clerk', clerkWebhooks)
// app.use('/api/educator', express.json(), educatorRouter)
// app.use('/api/course', express.json(), courseRouter)
// app.use('/api/user', express.json(), userRouter)
// app.get('/', (req, res) => res.send('server running'))
// // app.use('/api/user', educatorRouter)
// // app.use('/api/user', protect)
// app.use('/api/auth', userAuthRouter)

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => console.log(`server running on port ${PORT}`))
