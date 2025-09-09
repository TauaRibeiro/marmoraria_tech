const orcamentoController = require('../controllers/orcamentoController')
const express = require('express')
const router = express.Router()

router.post('/', orcamentoController.create)
router.get('/', orcamentoController.getAll)
router.get('/:id', orcamentoController.getById)
router.put('/:id', orcamentoController.update)

module.exports = router