const ambienteController = require('../controllers/ambienteController')
const express = require('express')
const router = express.Router()

router.get('/', ambienteController.getAll)
router.get('/:id', ambienteController.getById)
router.post('/', ambienteController.create)
router.patch('/:id', ambienteController.update)
router.delete('/:id', ambienteController.delete)

module.exports = router
