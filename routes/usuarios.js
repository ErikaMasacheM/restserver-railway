const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');
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
