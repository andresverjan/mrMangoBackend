const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productoSchema = new Schema({
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
     comercioId: {
         type: Number,
         required: false
     }
}, { timestamps: true })
module.exports = mongoose.model('products', productoSchema)