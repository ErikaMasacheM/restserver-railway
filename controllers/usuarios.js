const { response } = require('express');
const Usuario = require('../models/usuario')

const bcrypt = require('bcryptjs');

/**
 * Postman
 * metodo: Get
 * url: http://localhost:3000/api/usuarios?q=hola&page=1&limit=10
 */
const usuariosGet = async (req, res = response) => {

    const { limit = 0, desde = 0 } = req.query;
    const filtros = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(filtros),
        Usuario.find(filtros)
            .skip(+desde)
            .limit(+limit)
    ]);
console.log({ total, usuarios });
    res.json({ total, usuarios });
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

    res.json({ usuario });
}

/**
 * Postman
 * metodo: Put
 * url: http://localhost:3000/api/usuarios/1
 */
const usuariosPut = async (req, res = response) => {

    const { id } = req.params;

    const { password, google, ...resto } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findOneAndReplace({ _id: id }, resto, {
        new: true
    })

    res.json({
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch api - controller'
    })
}

const usuariosDelete = async (req, res = response) => {
    
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: true});

    res.json({
        msg: 'usuario borrado '
    })
}
module.exports = {
    usuariosGet: usuariosGet,
    usuariosPut: usuariosPut,
    usuariosPost: usuariosPost,
    usuariosPatch: usuariosPatch,
    usuariosDelete: usuariosDelete,
}