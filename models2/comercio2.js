const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comercioSchema2 = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    lat: {
        type: String,
        required: false
    },
    lng: {
        type: String,
        required: false
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products2'
    }]
}, { timestamps: true })
module.exports = mongoose.model('comercios2', comercioSchema2);
