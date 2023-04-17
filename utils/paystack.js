require('dotenv').config()
const paystack_secret = process.env.PAYSTACK_SECRET

const paystack = (req) => {
    
    const secretKey = `Bearer ${paystack_secret}`;

    const initPayment = (form, cb) => {
        const opt = {
            url: 'https://api.paystack.co/transaction/initialize',
            Headers: {
                authorization: secretKey,
                'content-type': 'application/json',
                'cache-control':  'no-cache'
            },
            form
        }
        const callback = (err, res, body) => {
            return cb(err, body)
        }
        req.post(opt, callback)
    }
    // initializes a Paystack transaction which returns an authorization url 
    // or an error as the case may be. Its purpose is to initialize the 
    // transaction and return the response of the request to where it was called.

    const verifyPayment = (ref, callback) => {

    }
    return { initPayment, verifyPayment}
}