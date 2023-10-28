const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');
const { correoExiste } = require('../helpers/db-validator');

const router = Router();

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', [
    check('correo').custom(correoExiste), 
    validarCampos
], usuariosPost)

router.patch('/', usuariosPatch)

router.delete('/', usuariosDelete)

module.exports = router;
