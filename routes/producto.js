const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { productosGet,
    productoGet,
    productoPost,
    productoPut,
    productoDelete } = require('../controllers/producto');

const { productoExiste, existeProductoPorId } = require('../helpers/db-validator');

const router = Router();

// obtener las producto
router.get('/', [
    validarJWT
], productosGet);

// obtener una producto por id
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoGet);

// crear una producto
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    check('categoria', 'El categoria es obligatoria').not().isEmpty(),
    check('nombre').custom(productoExiste),
    validarCampos
], productoPost);

// actualizar una producto
router.put('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoPut);

// eliminar una producto
router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoDelete);

module.exports = router;
