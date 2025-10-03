const orcamentoController = require('../controllers/orcamentoController')
const express = require('express')
const router = express.Router()
const autenticarToken = require('../middleware/auth')

router.post('/', autenticarToken, orcamentoController.create)
router.get('/', autenticarToken, orcamentoController.getAll)
router.get('/:id', autenticarToken, orcamentoController.getById)
router.put('/:id', autenticarToken, orcamentoController.update)
router.delete('/:id', autenticarToken, orcamentoController.delete)

module.exports = router