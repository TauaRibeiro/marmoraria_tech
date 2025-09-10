const itemOrcamentoService = require('../controllers/itemOrcamentoController')
const express = require('express')
const router = express.Router()

router.post('/', itemOrcamentoService.create)

module.exports = router