const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol:{
        type:String,
        required: true,
        enum: ['admin', 'user']
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuarios', usuarioSchema);
