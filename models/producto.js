const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productoSchema = new Schema({
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
        required: false    }
}, { timestamps: true })
module.exports = mongoose.model('products', productoSchema)