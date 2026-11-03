import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js'
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


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))



















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
