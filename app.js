const express = require('express')
const mongoose = require('mongoose')

const app = express()

const paymentRouter = require('./routes/payment')

require('dotenv').config()
const mongodb_url = process.env.MONGO_URL
const port_no = process.env.PORT_NO

app.use(paymentRouter)

mongoose.connect(mongodb_url)
    .then(result => {
        app.listen(port_no || 3000, () => {
            console.log("connected to mongoDB")
        })
    })
    .catch(err => console.log(err))