const jwt = require('jsonwebtoken')
const { request, response } = require('express');
const { Usuario } = require('../models')
const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la peticion' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.PUBLIC_KEY);
        const usuarioAutenticado = await Usuario.findById(uid);

        if (!usuarioAutenticado) {
            return res.status(401).json({ msg: 'No existe Usuario' });
        }

        if (!usuarioAutenticado.estado) {
            return res.status(401).json({ msg: 'Usuario bloqueado' });
        }

        req.usuarioAutenticado = usuarioAutenticado;

        // console.log(usuarioAutenticado);

        // next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ msg: 'Error interno del servidor' })
    }

    // console.log(token);

    next();
}

module.exports = {
    validarJWT: validarJWT
}