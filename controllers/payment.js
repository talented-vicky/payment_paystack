const {initPayment} = require('../utils/paystack')
const _ = require('lodash')

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
        // converting the body of the response to a javascript object.
        res.redirect(response.data.authorization_url)
        // picking authorization_url sent back by paystack and redirecting the 
        // payer to paystack to enter payment details; calling redirect on the app 
        // response object.
    })
}

exports.confirmPayment = (req, res, next) => {
    //
}