const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const requestSchema = new Schema({
    productoId: {
        type: String,
        required: true
    },
    subproductoId: {
        type: String,
        required: false
    },
    latlng: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    },
    requestId: {
        type: String,
        required: false
    }
}, { timestamps: true })
module.exports = mongoose.model('requests', requestSchema)