import express from 'express'
import { protect } from '../middleware/protect.js'
import { getEducator } from '../controllers/educatorController.js'
const userAuthRouter = express.Router()
userAuthRouter.get('/', protect)
userAuthRouter.get('/educator', getEducator)
export default userAuthRouter