const precoMaterialController = require('../controllers/precoMaterialController')
const express = require('express')
const router = express.Router()

router.post('/', precoMaterialController.create)

module.exports = router