const statusController = require('../controllers/statusController')
const express = require('express')
const router = express.Router()
const autenticarToken = require('../middleware/auth')

router.get('/', autenticarToken, statusController.getAll)
router.get('/:id', autenticarToken, statusController.getById)
router.post('/', autenticarToken, statusController.create)
router.put('/:id', autenticarToken, statusController.update)
router.delete('/:id', autenticarToken, statusController.delete)

module.exports = router
