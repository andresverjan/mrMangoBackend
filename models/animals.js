const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema= new Schema({

    name:{
        type: String,
        require: true
    },
    gender:{
        type: String,
        require: true
    },
    raza:{
        type: String,
        require: true
    },
    age:{
        type: String,
        require: true
    }

})
module.exports = mongoose.model('animals', animalSchema)