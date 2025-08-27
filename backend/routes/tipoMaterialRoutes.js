const tipoMaterialController = require('../controllers/tipoMaterialController')
const express = require('express')
const router = express.Router()
const autenticarToken = require('../middleware/auth')

router.get('/', tipoMaterialController.getAll)
router.get('/:id', tipoMaterialController.getByID)
router.post('/', tipoMaterialController.create)
router.patch('/:id', tipoMaterialController.update)
router.delete('/:id', tipoMaterialController.delete)

module.exports = router