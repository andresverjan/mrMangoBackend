const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
   name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    latlng: {
        type: String,
        required: false
    },
    jwt: {
        type: String,
        required: false
    },
    urlPhoto: {
        type: String,
        required: false
    },
    comercioId: {
        type: Number,
        required: false
    },
    online: {
        type: Boolean,
        required: false
    },
    rol_id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)