const Role = require("../models/role")
const Usuario = require("../models/usuario")

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const correoExiste = async(correo = '') => {
    const existeCorreo = await Usuario.findOne({correo});
    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya existe en la BD`);
    }
}

module.exports = {
    esRolValido: esRolValido,
    correoExiste: correoExiste
}