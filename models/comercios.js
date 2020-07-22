const mongoose = require('mongoose');
const { objectTypeToConfig } = require('graphql-tools');
const Schema = mongoose.Schema;
const comercioSchema = new Schema({
    id: {
        type: String,
        required: true
    },
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
     }
}, { timestamps: true })
module.exports = mongoose.model('comercios', comercioSchema)