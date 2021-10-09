const { Router } = require('express')
const shipmentController = require('../controllers/shipmentController')

const router = Router()

router.get('/shipments', shipmentController.shipments_get)
router.post('/shipment', shipmentController.shipment_add)
router.get('/shipment/:id', shipmentController.shipment_get)

module.exports = router