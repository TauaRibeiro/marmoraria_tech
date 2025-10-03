const funcionarioController = require('../controllers/funcionarioController')
const express = require('express')
const router = express.Router()
const autenticarToken = require('../middleware/admAuth')

router.get('/', autenticarToken, funcionarioController.getAll)
router.get('/:id', autenticarToken, funcionarioController.getById)
router.post('/', autenticarToken, funcionarioController.create)
router.put('/:id', autenticarToken, funcionarioController.update)
router.delete('/:idAdm/:idDelete', funcionarioController.delete)

module.exports = router