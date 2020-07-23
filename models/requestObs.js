const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const requestSchema = new Schema({  
    requestId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    userId: {
        type: String,
        required: false
    },
    observ: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, { timestamps: true })
module.exports = mongoose.model('requestObs', requestSchema)