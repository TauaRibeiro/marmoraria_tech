const funcionarioController = require('../controllers/funcionarioController')
const express = require('express')
const router = express.Router()
const autenticarToken = require('../middleware/auth')

router.get('/', funcionarioController.getAll)
router.get('/:id', funcionarioController.getById)
router.post('/', funcionarioController.create)
router.patch('/:id', funcionarioController.update)
router.delete('/:idUsuario/:idFuncionario', funcionarioController.delete)

module.exports = router