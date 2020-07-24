const mongoose = require('mongoose')

const requestDetailsAdditionsSchema = new Schema({
   additionId: {
       type: String,
       ref: 'additions'
   },
   requestDetailsId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'requestdetails'
   },
}, { timestamps: true })
module.exports = mongoose.model('requestDetailsAdditions', requestDetailsAdditionsSchema);