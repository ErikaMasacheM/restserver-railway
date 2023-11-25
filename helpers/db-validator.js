const { Usuario, Categoria, Role } = require("../models")

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const correoExiste = async (correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya existe en la BD`);
    }
}

const categoriaExiste = async (nombre = '') => {
    const categoriaDB = await Categoria.findOne({ nombre: nombre.toUpperCase() });
    if (categoriaDB) {
        throw new Error(`La categoria ${categoriaDB.nombre}, ya existe.`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`)
    }
}

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`)
    }
}

module.exports = {
    esRolValido: esRolValido,
    correoExiste: correoExiste,
    existeUsuarioPorId: existeUsuarioPorId,
    existeCategoriaPorId: existeCategoriaPorId,
    categoriaExiste: categoriaExiste
}