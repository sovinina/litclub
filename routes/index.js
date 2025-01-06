import {Router} from "express";
import eventsRouter from "./eventsRouter.js";
import userRouter from "./userRouter.js";


const router = Router()

router.use('/events', eventsRouter)
router.use('/user', userRouter)
export default router