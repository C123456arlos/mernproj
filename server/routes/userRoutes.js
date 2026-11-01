import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const userRouter = express.Router()
userRouter.get('/', protect)
export default userRouter