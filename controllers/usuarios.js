const { response } = require('express');
const Usuario = require('../models/usuario')

const bcrypt = require('bcryptjs');

/**
 * Postman
 * metodo: Get
 * url: http://localhost:3000/api/usuarios?q=hola&page=1&limit=10
 */
const usuariosGet = (req, res = response) => {

    const { q, nombre = 'No name', apiKey } = req.query;

    res.json({
        msg: 'get api - controller',
        q, nombre, apiKey
    })
}

/**
 * postman
 * metodo: post
 * url: http://localhost:3000/api/usuarios
 * datos: { "nombre": "Erika"}
 */
const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    console.log({ nombre, correo, password, rol });
    const usuario = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.json({usuario});
}

/**
 * Postman
 * metodo: Put
 * url: http://localhost:3000/api/usuarios/1
 */
const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put api - controller',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch api - controller'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete api - controller'
    })
}
module.exports = {
    usuariosGet: usuariosGet,
    usuariosPut: usuariosPut,
    usuariosPost: usuariosPost,
    usuariosPatch: usuariosPatch,
    usuariosDelete: usuariosDelete,
}