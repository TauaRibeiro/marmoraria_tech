const orcamentoController = require('../controllers/orcamentoController')
const express = require('express')
const router = express.Router()

router.post('/', orcamentoController.create)

module.exports = router