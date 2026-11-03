import express from 'express'
<<<<<<< HEAD
import { protect } from '../middleware/protect.js'
import { getEducator } from '../controllers/educatorController.js'
const userAuthRouter = express.Router()
userAuthRouter.get('/', protect)
userAuthRouter.get('/educator', getEducator)
export default userAuthRouter
=======
import { protect } from '../middleware/authMiddleware.js'
const userRouter = express.Router()
userRouter.get('/', protect)
export default userRouter
>>>>>>> 0c0728c727a5381719ce9b993453f4f3ad5bf6bc
