const materialController = require('../controllers/materialController')
const express = require('express')
const router = express.Router()

router.get('/', materialController.getAll)
router.get('/:id', materialController.getById)
router.post('/', materialController.create)
router.delete('/:id', materialController.delete)

module.exports = router