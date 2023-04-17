const express = require('express')

const router = express.Router()

const paymentCrl = require('../controllers/payment')

router.get('/', paymentCrl.getPayment)


module.exports = router;