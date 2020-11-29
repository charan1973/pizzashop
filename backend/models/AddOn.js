const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const addOnSchema = mongoose.Schema({
    addOnName: {
        type: String,
        required: true,
        unique: true
    },
    addOnType: {
        type: String,
        required: true,
        enum: ["topping", "addon"]
    },
    addOnCreator: {
        type: ObjectId,
        required: true
    },
    addOnPrice: {
        type: Number,
        required: true
    },
    addOnAvailable: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

const AddOn = mongoose.model("AddOn", addOnSchema)

module.exports = AddOn