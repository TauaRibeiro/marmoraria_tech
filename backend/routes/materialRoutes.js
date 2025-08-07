const materialController = require('../controllers/materialController')
const express = require('express')
const router = express.Router()

router.get('/', materialController.getAll)
router.post('/', materialController.create)

module.exports = router