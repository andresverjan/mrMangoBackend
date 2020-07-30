const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const requestSchema2 = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    total: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
    details: [{
        name: String,
        value: Number,
        additions: [{
            name: String,
            value: Number
        }]
    }],
    observations: [{
        type: Schema.Types.ObjectId,
        ref: 'requestObs'
    }]
}, { timestamps: true })
module.exports = mongoose.model('requests2', requestSchema2)
