const materialController = require('../controllers/materialController')
const express = require('express')
const router = express.Router()
const autenticarToken = require('../middleware/auth')

router.get('/', autenticarToken, materialController.getAll)
router.get('/:id', autenticarToken, materialController.getById)
router.post('/', autenticarToken, materialController.create)
router.delete('/:id', autenticarToken, materialController.delete)
router.put('/:id', autenticarToken, materialController.update)

module.exports = router