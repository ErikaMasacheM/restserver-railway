const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',
    [
        check('correo').isEmail().withMessage("Invalid email format"),
        check('password', 'Password is required').notEmpty(),
        validarCampos
    ],
    login);

module.exports = router;



