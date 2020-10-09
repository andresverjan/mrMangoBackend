const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const documentosSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        fechaPublicacion: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("documentos", documentosSchema);