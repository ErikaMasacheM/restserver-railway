const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');
const { correoExiste, existeUsuarioPorId } = require('../helpers/db-validator');

const router = Router();

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut)

router.post('/', [
    check('correo').custom(correoExiste),
    validarCampos
], usuariosPost)

router.patch('/', usuariosPatch)

router.delete('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

module.exports = router;
