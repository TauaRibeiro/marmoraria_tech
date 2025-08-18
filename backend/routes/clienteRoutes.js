const clienteController = require('../controllers/clienteController')
const express = require('express')
const router = express.Router()

router.post('/', clienteController.create)

module.exports = router