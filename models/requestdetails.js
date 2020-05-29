const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const RequestDetailsSchema = new Schema({
    requestId: {
        type: String,
        required: true
    },
    productoId: {
        type: String,
        required: true
    },
    subproductoId: {
        type: String,
        required: false
    },
    carSubproductoId: {
        type: String,
        required: false
    },
    userId: {
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
    },

    requestId: {
        type: String,
        required: false
    }
}, { timestamps: true })
module.exports = mongoose.model('requestdetails', RequestDetailsSchema)