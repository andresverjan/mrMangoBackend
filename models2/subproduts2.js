const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const subproductsSchema2 = new Schema({
    _id: Schema.Types.ObjectId,
   name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false    
    },
    img: {
        type: String,
        required: false    
    },
    active: {
        type: Boolean,
        required: false
    },
    additions: [{
        type: Schema.Types.ObjectId,
        ref: 'additions',
        required: false
    }]
}, { timestamps: true })
module.exports = mongoose.model('subproducts2', subproductsSchema2)
