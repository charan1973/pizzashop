const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderContentSchema = mongoose.Schema({
  orderItem: {
    type: ObjectId,
    ref: "Item",
  },
  addOn: [
    {
      addOnItem: {
        type: ObjectId,
        ref: "AddOn",
      },
    },
  ],
});

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: ObjectId,
      ref: "User.address",
      required: true,
    },
    orderContent: [orderContentSchema],
    orderStatus: {
      type: String,
      enum: ["completed", "delivered", "cancelled", "accepted"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
