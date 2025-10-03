const clienteController = require('../controllers/clienteController')
const autenticarToken = require('../middleware/auth')
const express = require('express')
const router = express.Router()

router.post('/', autenticarToken, clienteController.create)
router.get('/', autenticarToken, clienteController.getAll)
router.get('/:id', autenticarToken, clienteController.getByID)
router.delete('/:id', autenticarToken, clienteController.delete)
router.put('/:id', autenticarToken, clienteController.update)

module.exports = router