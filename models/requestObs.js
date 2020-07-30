const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const requestObsSchema = new Schema({  
    requestId: {
        type: mongoose.Schema.ObjectId,
        ref: 'requests2',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    observation: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, { timestamps: true })
module.exports = mongoose.model('requestObs', requestObsSchema)