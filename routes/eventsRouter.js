import {Router} from "express";
import eventsController from "../controllers/eventsController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from 'multer'

const posters = multer({dest:"public/data/poster/"})
const router = Router()


router.get('/',eventsController.get)
router.post('/', authMiddleware,checkRoleMiddleware('ADMIN'), posters.single("poster"), eventsController.create)
router.delete('/:id',authMiddleware,checkRoleMiddleware('ADMIN'), eventsController.delete)
router.patch('/',authMiddleware,checkRoleMiddleware('ADMIN'), eventsController.update)
export default router