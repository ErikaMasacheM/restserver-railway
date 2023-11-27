const { Router, response } = require('express');
const { cargarArchivo } = require('../controllers/uploads');

const router = Router()

router.post('/', cargarArchivo);

module.exports = router;