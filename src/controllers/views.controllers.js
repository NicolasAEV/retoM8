import pool from "../db/db.js"


export const getAllVehicles = async (req, res) => {
    let vehiculos = await pool.query('SELECT imagen, modelo , marca , year FROM AUTO')


    res.render('inicio', {
        title: 'inicio',
        vehiculos: vehiculos.rows,
    })
}

export const getMyVehicles = async (req, res) => {

    let vehiculos = await pool.query('SELECT id, imagen, modelo , marca , year FROM AUTO WHERE id_usuario = $1', [req.usuario.id])
    res.render('inventario', {
        title: 'inventario',
        vehiculos: vehiculos.rows
    })
}
export const getMyVehiclesById = async (req, res) => {
    let { id } = req.params
    let vehiculos = await pool.query('SELECT id, imagen, modelo , marca , year FROM AUTO WHERE id_usuario = $1 AND id = $2', [req.usuario.id, id])
   
    res.render('update', {
        title: 'actualizar',
        vehiculos: vehiculos.rows
    })
}

export const registrarVehiculo = async (req, res) => {
    let { marca, modelo, year } = req.body
    let query = `INSERT INTO auto(imagen, modelo , marca , year)
    VALUES($1, $2, $3, $4) RETURNING *`
    let resultado = await pool.query(query, [marca, modelo, year, imagen]);
    return resultado.rows[0];
}