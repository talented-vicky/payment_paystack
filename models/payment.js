const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    ref: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Payment', paymentSchema)