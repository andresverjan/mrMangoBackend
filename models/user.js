const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
   name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    latlng: {
        type: String,
        required: false
    },
    jwt: {
        type: String,
        required: false
    },
    urlPhoto: {
        type: String,
        required: false
    }

}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)