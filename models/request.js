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
        name: String,
        value: Number,
        additions: [{
            adittion: {
                type: Schema.Types.ObjectId,
                ref: 'additions'
            },
            name: String,
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