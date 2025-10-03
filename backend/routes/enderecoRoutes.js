const express = require('express')
const router = express.Router()
const controllerEndereco = require('../controllers/enderecoController')
const autenticarToken = require('../middleware/auth')

router.get('/', autenticarToken, controllerEndereco.getAll)
router.get('/:id', autenticarToken, controllerEndereco.getById)
router.post('/', autenticarToken, controllerEndereco.create)
router.put('/:id', autenticarToken, controllerEndereco.update)
router.delete('/:id', autenticarToken, controllerEndereco.delete)

module.exports = router