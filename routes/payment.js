const express = require('express')

const router = express.Router()

const paymentCrl = require('../controllers/payment')

router.get('/', paymentCrl.getHome)

router.get('/payment', paymentCrl.getPayment)

router.post('/api/paystack', paymentCrl.sendPayment)

router.get('/api/paystack/callback', paymentCrl.confirmPayment)

module.exports = router;