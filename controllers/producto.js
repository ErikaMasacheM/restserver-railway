const { response } = require("express")
const { Producto } = require('../models');

const productosGet = async (req, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const filtros = { estado: true }

    const [total, productos] = await Promise.all([
        Producto.countDocuments(filtros),
        Producto.find(filtros)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ]);

    return res.json({
        total,
        productos
    });


};

const productoGet = async (req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre');

    return res.json(producto);
}

const productoPost = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    const productoNueva = new Producto(data);

    await productoNueva.save();
    return res.json(productoNueva);
}

const productoPut = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuarioAutenticado._id;

    const producto = await Producto.findOneAndUpdate({ _id: id }, data, { new: true });

    return res.json(producto);
}

const productoDelete = async (req, res = response) => {
    
    const { id } = req.params;
    const producto = await Producto.findOneAndUpdate({ _id: id }, {estado: false}, { new: false } );

    return res.json(producto);
}

module.exports = {
    productosGet: productosGet,
    productoGet: productoGet,
    productoPost: productoPost,
    productoPut: productoPut,
    productoDelete: productoDelete,
}