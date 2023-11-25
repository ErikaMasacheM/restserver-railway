const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Categoria"
    }
});

ProductoSchema.methods.toJSON = function () {
    const { __v, estado, ...producto } = this.toObject();
    return producto;
}

module.exports = model('Producto', ProductoSchema);