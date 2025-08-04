const ambienteController = require('../controllers/ambienteController')
const express = require('express')
const router = express.Router()
const autenticarToken = require('../middleware/auth')

router.get('/', autenticarToken, ambienteController.getAll)
router.get('/:id', autenticarToken, ambienteController.getById)
router.post('/', autenticarToken, ambienteController.create)
router.patch('/:id', autenticarToken, ambienteController.update)
router.delete('/:id', autenticarToken, ambienteController.delete)

module.exports = router
