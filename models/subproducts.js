const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const subproductsSchema = new Schema({
   name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false    
    },
    activo: {
        type: String,
        required: false    
    },
    img: {
        type: String,
        required: false    
    },
    productoId: {
        type: Number,
        required: false    
    },
    comercioId: {
        type: Number,
        required: false    
    },
}, { timestamps: true })
module.exports = mongoose.model('subproducts', subproductsSchema)