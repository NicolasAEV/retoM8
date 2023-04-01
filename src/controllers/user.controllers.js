import pool from "../db/db.js"


export const getClient = async (email , password) =>{
    let consulta = "SELECT id, email FROM usuario WHERE email = $1 AND password = $2"
    let resultado = await pool.query(consulta, [email, password]);
    return resultado.rows[0];
}

export const registrar = async (req,res)=>{
    try {
        let {email , password} = req.body
     
        let consulta = "SELECT id, email FROM usuario WHERE email = $1"
        let resultado = await pool.query(consulta, [email]);
     
        if(resultado.rows > 0){
        res.status(500).json({code : 500 , error : 'el usuariop ya existe'})
          
        }else{
            await pool.query('INSERT INTO usuario (email , password) VALUES ($1, $2)',[email,password])
            res.status(200).json({code : 200 , message : 'usuario creado con exito'})
        }
    } catch (error) {
      
        res.status(500).json({code : 500 , error})
    }
}