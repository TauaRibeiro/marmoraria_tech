const express = require('express')
const router = express.Router()
const controllerEndereco = require('../controllers/enderecoController')
const autenticarToken = require('../middleware/auth')

router.get('/', controllerEndereco.getAll)
router.get('/:id', controllerEndereco.getById)
router.post('/', controllerEndereco.create)
router.put('/:id', controllerEndereco.update)
router.delete('/:id', controllerEndereco.delete)

module.exports = router