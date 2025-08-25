const clienteController = require('../controllers/clienteController')
const express = require('express')
const router = express.Router()

router.post('/', clienteController.create)
router.get('/', clienteController.getAll)
router.get('/:id', clienteController.getByID)
router.delete('/:id', clienteController.delete)
router.put('/:id', clienteController.update)

module.exports = router