const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productSchema2 = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    subproductos: [{
        type: Schema.Types.ObjectId,
        ref: 'subproducts2'
    }]
}, { timestamps: true })
module.exports = mongoose.model('products2', productSchema2)
