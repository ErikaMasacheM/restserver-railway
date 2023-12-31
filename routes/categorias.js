const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { categoriaGet,
    categoriasGet,
    categoriasPost,
    categoriasPut,
    categoriasDelete } = require('../controllers/categorias');

const { categoriaExiste, existeCategoriaPorId } = require('../helpers/db-validator');

const router = Router();

// obtener las categorias
router.get('/', [
    validarJWT
], categoriasGet);

// obtener una categoria por id
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], categoriaGet);

// crear una categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(categoriaExiste),
    validarCampos
], categoriasPost);

// actualizar una categoria
router.put('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], categoriasPut);

// eliminar una categoria
router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], categoriasDelete);

module.exports = router;
