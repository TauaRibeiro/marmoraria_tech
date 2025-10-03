const tipoMaterialController = require('../controllers/tipoMaterialController')
const express = require('express')
const router = express.Router()
const autenticarToken = require('../middleware/auth')

router.get('/', autenticarToken, tipoMaterialController.getAll)
router.get('/:id', autenticarToken, tipoMaterialController.getByID)
router.post('/', autenticarToken, tipoMaterialController.create)
router.put('/:id', autenticarToken, tipoMaterialController.update)
router.delete('/:id', autenticarToken, tipoMaterialController.delete)

module.exports = router