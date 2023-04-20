const express = require('express')

const router = express.Router()

const paymentCrl = require('../controllers/payment')

router.get('/', paymentCrl.getHome)

router.get('/error-page', paymentCrl.errorPage)

router.get('/payment', paymentCrl.getPayment)

router.post('/api/paystack', paymentCrl.sendPayment)

router.get('/api/paystack/callback', paymentCrl.confirmPayment)

router.get('/api/receipt/:receiptId', paymentCrl.getReceipt)

module.exports = router;