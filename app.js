const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bp = require('body-parser')
const _ = require('lodash')

const app = express()

const paymentRouter = require('./routes/payment')

require('dotenv').config()
const mongodb_url = process.env.MONGO_URL
const port_no = process.env.PORT_NO


app.use(bp.json())
app.use(bp.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public/')))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(paymentRouter)

// const response = {
//     data: [
//         'check', 'payment', ' service', 'clone', 'backticks'
//     ],
//     age: true,
//     nationality: "nigerian"
// }
// const temp = _.pick(response.data, ['check', 'payment', 'service', 'clone'])
// const temp = _.pick(response.data, ['data', age, nationality])
// console.log(temp)

// [varied, vari, va, clan] = temp
// const nemp = {
//     first: vairied,
//     sec: vari,
//     third: va,
//     fourth: clan
// }
// console.log(nemp)

mongoose.connect(mongodb_url)
    .then(result => {
        app.listen(port_no || 3000, () => {
            console.log("connected to mongoDB")
        })
    })
    .catch(err => console.log(err))