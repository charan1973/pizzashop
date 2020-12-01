const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    size: {
      regular: {
        type: Number,
        default: 0,
      },
      medium: {
        type: Number,
        default: 0,
      },
      large: {
        type: Number,
        default: 0,
      },
    },
    image: {
      type: Object,
      default: {},
    },
    itemCreator: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    itemCategory: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    itemAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
