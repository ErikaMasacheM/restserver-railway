const { response } = require("express")
const { Categoria } = require('../models');

const categoriasGet = async (req, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const filtros = { estado: true }

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(filtros),
        Categoria.find(filtros)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ]);

    return res.json({
        total,
        categorias
    });


};

const categoriaGet = (req, res = response) => {
    return res.json({ msg: `get ` });
}

const categoriasPost = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    const categoriaNueva = new Categoria(data);

    await categoriaNueva.save();
    return res.json(categoriaNueva);
}

const categoriasPut = (req, res = response) => {
    return res.json({ msg: `put ` });
}

const categoriasDelete = (req, res = response) => {
    return res.json({ msg: `delete ` });
}

module.exports = {
    categoriasGet,
    categoriaGet,
    categoriasPost,
    categoriasPut,
    categoriasDelete,
}