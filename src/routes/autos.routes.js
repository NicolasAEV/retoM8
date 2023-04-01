import  express  from 'express'
import { verificarToken} from '../middleware/jwt.js'
import { getAllVehicles ,createVehicles,deleteVehicles, actualizarVehicles} from '../controllers/autos.controllers.js'
import { upload } from '../middleware/upload.js'
const router = express.Router()

router.get('/api/autos',getAllVehicles,(req,res)=>{})
      .post('/api/autos',verificarToken,upload,createVehicles ,(req,res)=>{})
      .put('/api/autos/:id',verificarToken,upload,actualizarVehicles,(req,res)=>{})
      .delete('/api/auto/:id',verificarToken,deleteVehicles , (req,res)=>{})
    
// router.post('/api/autos/:id',verificarToken ,(req,res)=>{})



export default router