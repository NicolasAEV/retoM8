import path from 'path'
import { join ,dirname} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {v4 as uuid} from 'uuid'

export const upload = (req, res, next) => {
    try{
        
        if(req.files == null) return res.status(400).json({code: 400, message: "Debe proporcionar una imagen."})
        let {imagen} = req.files;
        let mimetype = imagen.mimetype.split("/")[0];
        if(mimetype != "image") return res.status(400).json({code: 400, message: "El archivo subido no corresponde a una imagen."})

        let nombreimagen = `${uuid().slice(0,6)}-${imagen.name}`
        let rutaPath = path.resolve(__dirname, "../public/img/"+nombreimagen)

        imagen.mv(rutaPath, function(err) {
            if (err) {
              return res.status(500).json({code: 500, message:"No se pudo guardar la imagen de la publicación."});
            }
            req.imagen = nombreimagen;
            next();
          });


    }catch(error){
        res.status(500).json({code: 500, message: "No se pudo cargar la imagen."})
    }

}

// const ruta = path.resolve(__dirname , name)
// console.log(ruta)
// fs.unlink(ruta, error =>{
//     if(error) console.log('hubo un error')
//     console.log(paso)
// })



