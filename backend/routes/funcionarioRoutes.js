const funcionarioController = require('../controllers/funcionarioController')
const express = require('express')
const router = express.Router()
const autenticarToken = require('../middleware/auth')

router.get('/', autenticarToken, funcionarioController.getAll)
router.get('/:id', autenticarToken, funcionarioController.getById)
router.post('/', autenticarToken, funcionarioController.create)
router.patch('/:id', autenticarToken, funcionarioController.update)
router.delete('/:idUsuario/:idFuncionario', autenticarToken, funcionarioController.delete)

module.exports = router