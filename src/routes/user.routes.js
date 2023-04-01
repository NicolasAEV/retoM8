import  express  from 'express'
import { emisionToken } from '../middleware/jwt.js'
import { registrar } from '../controllers/user.controllers.js'
const router = express.Router()


router.post('/api/login',emisionToken,(req,res)=>{})
router.post('/api/regitro',registrar ,(req,res)=>{})



export default router