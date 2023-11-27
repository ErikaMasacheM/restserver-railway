const { response, text } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto, Role } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'categorias'
];

const buscarUsuario = async (termino, res = response) => {
    const isMongoId = ObjectId.isValid(termino);

    if (isMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = RegExp(termino, 'i')

    const usuario = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{estado: true}]
    });
    return res.json({
        results: usuario
    })

}

const buscarCategoria = async (termino, res = response) => {
    const isMongoId = ObjectId.isValid(termino);

    if (isMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = RegExp(termino, 'i')

    const categoria = await Categoria.find({
        $or: [{ nombre: regex }],
        $and: [{estado: true}]
    });
    return res.json({
        results: categoria
    })

}

const buscarProducto = async (termino, res = response) => {
    const isMongoId = ObjectId.isValid(termino);

    if (isMongoId) {
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = RegExp(termino, 'i')

    const producto = await Producto.find({
        $or: [{ nombre: regex }],
        $and: [{estado: true}]
    });
    return res.json({
        results: producto
    })

}
const buscar = (req, res = response) => {

    const { coleccion, texto } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).send({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(texto, res);
            return;
        case 'categorias':
            return buscarCategoria(texto, res);
        case 'productos':
            return buscarProducto(texto, res);
        default:
            res.status(500).json({
                msg: `Se le olvido hacer esta busqueda`
            });
            break;
    }

    return res.json({ msg: 'buscar' });
}

module.exports = {
    buscar: buscar
}