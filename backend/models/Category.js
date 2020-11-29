const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    categoryCreator: {
        type: ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category