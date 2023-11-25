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

const categoriaGet = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    return res.json(categoria);
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

const categoriasPut = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuarioAutenticado._id;

    const categoria = await Categoria.findOneAndUpdate({ _id: id }, data, { new: true });

    return res.json(categoria);
}

const categoriasDelete = async (req, res = response) => {
    
    const { id } = req.params;
    const categoria = await Categoria.findOneAndUpdate({ _id: id }, {estado: false}, { new: false } );

    return res.json(categoria);
}

module.exports = {
    categoriasGet: categoriasGet,
    categoriaGet: categoriaGet,
    categoriasPost: categoriasPost,
    categoriasPut: categoriasPut,
    categoriasDelete: categoriasDelete,
}