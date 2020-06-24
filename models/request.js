const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const requestSchema = new Schema({  
    latlng: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    },
    total: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, { timestamps: true })
module.exports = mongoose.model('requests', requestSchema)