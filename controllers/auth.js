const { response } = require('express');
const bcrypt = require('bcryptjs');
const  Usuario  = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const login =  async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o Password incorrectos - correo'
            });
        }

        // si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario bloqueado'
            });
        }
        // verificar la contrasenia
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o Password incorrectos - password'
            });
        }
        
        // generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({usuario, token});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Error en el servidor"});
    }

    
}

module.exports = {
    login: login
}