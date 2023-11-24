const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares')

const { correoExiste, existeUsuarioPorId } = require('../helpers/db-validator');
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');

const router = Router();

router.get('/',[validarJWT, validarCampos], usuariosGet);

router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut)

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('password','El contrasenia es obligatorio').not().isEmpty(),
    check('rol','El rol es obligatorio').not().isEmpty(),
    check('correo').custom(correoExiste),
    validarCampos
], usuariosPost)

router.patch('/', [validarJWT], usuariosPatch)

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

module.exports = router;
