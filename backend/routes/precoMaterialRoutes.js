const precoMaterialController = require('../controllers/precoMaterialController')
const express = require('express')
const router = express.Router()

router.post('/', precoMaterialController.create)
router.get('/', precoMaterialController.getAll)

module.exports = router