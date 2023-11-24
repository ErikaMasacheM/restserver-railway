const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

module.exports = {
    validarJWT,
    validarCampos,
}