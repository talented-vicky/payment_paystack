require('dotenv').config()
const paystack_secret = process.env.PAYSTACK_SECRET

const paystack = (req) => {
    
    const secretKey = `Bearer ${paystack_secret}`;

    const initPayment = (form, cb) => {
        const opt = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization: secretKey,
                'content-type': 'application/json',
                'cache-control':  'no-cache'
            },
            form // this will contain the name, email, amount and other params
        }

        const callback = (err, response, body) => {
            return cb(err, body)
        }
        // All the "callback" does is return the callback function (cb) passed
        // into the initPayment passing in the error and body from 
        // the request. cb would be well defined to run after 
        // initializePayment runs whenever we call it.

        req.post(opt, callback)
        // a request convenience method to initialize a POST request; passing in 
        // the [request "opt" object] and the [request "callback"] created above.
    }
    // initializes a Paystack transaction which returns (the response of the 
    // request to where it was called) an authorization url or an error as the 
    // case may be.

    const verifyPayment = (ref, cb) => {
        const opt = {
            url: 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
            headers: {
                authorization: secretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        }
        const callback = (err, response, body) => {
            return cb(err, body)
        }
        req(opt, callback)
        // this is automatically a get request
    }
    // After payment on Paystack platform, the user is redirected to a callback 
    // url set on the merchant’s paystack settings page. This callback url comes 
    // back with a "query" string of the transaction reference stored in the 
    // reference variable (in model I guess).

    // It is on this callback url endpoint that I call the verifyPayment() and make 
    // a request to paystack with the reference returned. If the request was 
    // successful, it would return a large object of the transaction containing many 
    // information about the transaction, like the amount, date, reference, 
    // payment_type, metadata, etc.

    return { initPayment, verifyPayment }
}

module.exports = paystack;