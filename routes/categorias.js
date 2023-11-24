const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { categoriaGet,
    categoriasGet,
    categoriasPost,
    categoriasPut,
    categoriasDelete } = require('../controllers/categorias');

const router = Router();

// obtener las categorias
router.get('/', categoriasGet);

// obtener una categoria por id
router.get('/:id', [validarJWT], categoriaGet);

// crear una categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriasPost);

// actualizar una categoria
router.put('/', [
    validarJWT,
    validarCampos
], categoriasPut);

// eliminar una categoria
router.delete('/', [
    validarJWT,
    validarCampos
], categoriasDelete);

module.exports = router;
