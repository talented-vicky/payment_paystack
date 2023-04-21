const request = require('request')
const Payment = require('../models/payment')
const {initPayment, verifyPayment} = require('../utils/paystack')(request)
const _ = require('lodash')

exports.errorPage = (req, res, next) => {
    res.render('error', {
        pageTitle: "Error Page"
    })
}

exports.getHome = (req, res, next) => {
    res.render('index', {
        pageTitle: "Home Page",
        path: '/home-page'
    })
}

exports.getPayment = (req, res, next) => {
    res.render('form', {
        pageTitle: 'Form Page',
        path: '/payment-page'
    })
}

exports.sendPayment = (req, res, next) => {
    // const name = req.body.fullname
    // const email = req.body.email
    // const amount = req.body.amount

    const form = _.pick(req.body, ['fullname', 'email', 'amount'])
    // this is functionally equal to what I have up there

    form.metadat = {
        fullname: form.fullname
    }
    form.amount *= 100

    initPayment(form, (err, body) => {
        if(err){
            console.log(err)
            return
        }
        response = JSON.parse(body)
        console.log(response)
        // converting the body of the response to a javascript object.
        res.redirect(response.data.authorization_url)
        // picking authorization_url sent back by paystack and redirecting the 
        // payer to paystack to enter payment details; calling redirect on the app 
        // response object.
    })
}

// After payer's interaction with paystack, the payer is redirected back to our 
// application. In order to handle this, paystack gives us the privilege to set 
// the callback url after interaction with it. 

// => On my paystack dashboard. go to paystack => settings => API keys and 
// Webhook tab. Then set to the confirmPayment url

exports.confirmPayment = (req, res, next) => {
    // After initializing the payment with paystack, the callback from paystack 
    // has some payloads, one of which is the reference (a unique id tied to every
    // transaction made on paystack). I need this reference to double check 
    // the transaction made.

    const ref = req.query.reference
    console.log(ref)
    verifyPayment(ref, (err, body) => {
        if(err){
            console.log(err)
            return res.redirect('/error-page')
        }
        response = JSON.parse(body)
        console.log(response)
        const data = _.at(
            response.data, 
            ['reference', 'amount', 'customer.email', 'metadata.fullname']
        ) // this returns a data and I selectively chose some of it and stored in an array

        [reference, amount, email, fullname] = data
        //this is me assigning variables (keys) to the values of the array
        
        // fix bug here
        const payment = new Payment({
            full_name: fullname,
            email: email,
            amount: amount,
            ref: reference
        })
        payment.save()
            .then(paysuccess => {
                if(paysuccess){
                    console.log("Successfully completed payment")
                    res.redirect('/api/receipt/' + paysuccess._id)
                }
            })
            .catch(err => console.log(err))
    })
}

exports.getReceipt = (req, res, next) => {
    receiptID = req.params.receiptId

    Payment.findById(receiptID)
        .then(payer => {
            if(!payer){
                console.log("No user info found")
                res.redirect('/error-page')
            }
            console.log(payer)
            res.redirect('success', {
                pageTitle: "Payment Success",
                userInfo: payer
            })
        })
        .catch(err => console.log(err))
}