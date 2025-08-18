const clienteController = require('../controllers/clienteController')
const express = require('express')
const router = express.Router()

router.post('/', clienteController.create)
router.get('/', clienteController.getAll)

module.exports = router