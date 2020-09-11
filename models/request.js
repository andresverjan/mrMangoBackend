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
    details: [{
        subproducto: {
            type: Schema.Types.ObjectId,
            ref: 'subproducts'
        },
        value: Number,
        additions: [{
            addition: {
                type: Schema.Types.ObjectId,
                ref: 'additions'
            },
            value: Number
        }]
    }],
    observations: [{
        type: Schema.Types.ObjectId,
        ref: 'requestObs',
        required: false
    }]
}, { timestamps: true })
module.exports = mongoose.model('requests', requestSchema)