const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const requestDetailsAdditionsSchema = new Schema({
   additionId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'additions'
   },
   requestDetailsId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'requestdetails'
   },
}, { timestamps: true })
module.exports = mongoose.model('requestDetailsAdditions', requestDetailsAdditionsSchema);