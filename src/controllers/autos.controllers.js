import pool from "../db/db.js"
import fs from 'fs'
import path from 'path'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const getAllVehicles = async (req, res) => {
    try {
        let vehiculos = await pool.query('SELECT imagen, modelo , marca , year FROM AUTO')
        if (vehiculos.rows > 0) {
            res.status(500).json({ code: 500, message: "no se encontraron vehiculos" })
        } else {
            res.status(200).json({ code: 200, data: vehiculos.rows })
        }
    } catch (error) {
        res.status(500).json({ code: 500, message: "error al cargar los vehiculos" })
    }
}
export const addVehicles = async (marca, modelo, year, imagen, id_usuario) => {
    let query = `INSERT INTO auto(marca, modelo, year, imagen, id_usuario)
    VALUES($1, $2, $3, $4, $5) RETURNING *
`
    let resultado = await pool.query(query, [marca, modelo, year, imagen, id_usuario]);
    return resultado.rows[0];
}
export const createVehicles = async (req, res) => {
    let { marca, modelo, year } = req.body
    try {
    
   
        if (marca == undefined || modelo == undefined || year == undefined) {
            fs.unlinkSync(path.resolve(__dirname, "../public/img/" + req.imagen));
            return res.status(400).json({ code: 400, message: "no ha proporcionado todo el contenido requerido." })
        }
    
        addVehicles(marca, modelo, year, req.imagen, req.usuario.id)
            .then(respuesta => {
                res.status(201).json({ code: 201, message: "Publicación realizada con éxito." })
            }).catch(error => {
                console.log(error)
                fs.unlinkSync(path.resolve(__dirname, "../public/img/" + req.imagen));
                res.status(500).json({ code: 500, message: "Error con la base de datos." })
            })
        //    res.status(200).json({code : 200 , data : vehiculos.rows})


    } catch (error) {
        fs.unlinkSync(path.resolve(__dirname, "../public/img/" + req.imagen));
        res.status(500).json({ code: 500, message: "error al cargar los vehiculos" })

    }
}

export const deleteVehicles = async (req, res) => {
    try {
        let { id } = req.params
        await pool.query('DELETE FROM auto WHERE id = $1', [id])
        res.status(200).json({ code: 200, message: "auto eliminado exitosamente" })
    } catch (error) {
        res.status(500).json({ code: 500, message: "error al intentar eliminar el vehiculo" })

    }
}

export const updateVehicles = async (marca, modelo, year, imagen, id) => {
   
    let query = `UPDATE auto set marca = $1, modelo= $2, year= $3, imagen= $4 where id= $5`
    let resultado = await pool.query(query, [marca, modelo, year, imagen, id]);
    return resultado.rows[0];
}


export const actualizarVehicles = async (req, res) => {

    
    let { marca, modelo, year ,nameImagen } = req.body
    let {id} = req.params
    let imagen = req.imagen
    let ruta  = path.resolve(__dirname ,'../public/img/' + nameImagen)
 
    try {
   
        if (marca == undefined || modelo == undefined || year == undefined) {
            fs.unlinkSync(path.resolve(__dirname, "../public/img/" + req.imagen));
            return res.status(400).json({ code: 400, message: "no ha proporcionado todo el contenido requerido." })
        }
  
        updateVehicles(marca, modelo, year, imagen, id )
            .then(respuesta => {
             
                if(!imagen){
                    imagen = nameImagen
                } else{
                    fs.unlink(ruta, error => {
                        if (error) console.log('error al eliminar la imagen anterior')
                        res.status(201).json({ code: 201, message: "Publicación realizada con éxito." })
                        
                    })
                }
               
            }).catch(error => {
             
                fs.unlinkSync(path.resolve(__dirname, "../public/img/" + req.imagen));
                res.status(500).json({ code: 500, message: "Error con la base de datos." })
            })
        //    res.status(200).json({code : 200 , data : vehiculos.rows})


    } catch (error) {
        fs.unlinkSync(path.resolve(__dirname, "../public/img/" + req.imagen));
        res.status(500).json({ code: 500, message: "error al cargar los vehiculos" })

    }
}
