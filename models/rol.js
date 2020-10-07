const mongoose = require('mongoose');
const { objectTypeToConfig } = require('graphql-tools');
const Schema = mongoose.Schema;
const rolSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model('roles', rolSchema)