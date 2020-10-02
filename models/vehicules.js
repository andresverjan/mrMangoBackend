const mongoose = require("mongoose");
const { schema } = require("./requestObs");
const Schema = mongoose.Schema;
const vehiculesSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        brand: {
            type: String,
            required: true,
        },
        model: {
            type: Date,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("vehicules", vehiculesSchema);
