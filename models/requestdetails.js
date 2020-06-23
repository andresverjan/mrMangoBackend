const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const RequestDetailsSchema = new Schema({
    requestId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    subproductoId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    carSubproductoId: {
        type: String,
        required: false
    },
    latlng: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    value:{
        type: String,
        required: false
    }
}, { timestamps: true })
module.exports = mongoose.model('requestdetails', RequestDetailsSchema)