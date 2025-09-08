const orcamentoController = require('../controllers/orcamentoController')
const express = require('express')
const router = express.Router()

router.post('/', orcamentoController.create)
router.get('/', orcamentoController.getAll)

module.exports = router