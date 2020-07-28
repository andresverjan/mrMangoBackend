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
    products: [{
        name: String,
        value: Number,
        quantity: Number,
        additions: [{
            name: String,
            value: Number
        }]
    }],
    observations: [{
        observation: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }]
}, { timestamps: true })
module.exports = mongoose.model('requests2', requestSchema2)
