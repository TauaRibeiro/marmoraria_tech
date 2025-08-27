const ambienteController = require('../controllers/ambienteController')
const express = require('express')
const router = express.Router()
const autenticarToken = require('../middleware/auth')

router.get('/', ambienteController.getAll)
router.get('/:id', ambienteController.getById)
router.post('/', ambienteController.create)
router.put('/:id', ambienteController.update)
router.delete('/:id', ambienteController.delete)

module.exports = router
