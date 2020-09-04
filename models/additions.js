const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const additionsSchema = new Schema({
   name: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false            
    },
    active: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: true
    },

}, { timestamps: true })
module.exports = mongoose.model('additions', additionsSchema)