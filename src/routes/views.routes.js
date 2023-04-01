import express from 'express'
import { getAllVehicles , getMyVehicles ,registrarVehiculo,getMyVehiclesById} from '../controllers/views.controllers.js'
import {verificarToken} from '../middleware/jwt.js'
const router = express.Router()

router.get('/',getAllVehicles,(req,res)=>{})


router.get('/inventario',verificarToken,getMyVehicles,(req,res)=>{})
router.get('/inventario/:id',verificarToken,getMyVehiclesById,(req,res)=>{})


export default router