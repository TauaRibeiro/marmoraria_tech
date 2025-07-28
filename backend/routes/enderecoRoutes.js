const express = require('express')
const router = express.Router()
const controllerEndereco = require('../controllers/enderecoController')

router.get('/', controllerEndereco.getAll)
router.get('/:id', controllerEndereco.getById)
router.post('/', controllerEndereco.create)
router.patch('/:id', controllerEndereco.update)
router.delete('/:id', controllerEndereco.delete)

module.exports = router