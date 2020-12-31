const User = require("../models/User")
const Order = require("../models/Order")

// Order controllers
exports.createOrder = async (req, res) => {
    const { orderContent, addressId } = req.body;
  
    // Calculate amount
    const bill = orderContent.reduce(
      (a, item) =>
        a +
        (item.itemPrice +
          item.addOn.reduce((b, addOn) => b + addOn.addOnPrice, 0)) *
          item.quantity,
      0
    );
  
    // Find address for adding to the order document
    const findUser = await User.findById(req.user.id);
    const address = findUser.address.id(addressId);
  
    const newOrder = new Order({
      orderPrice: bill,
      address,
      orderContent,
      customer: req.user.id,
    });
  
    try {
      const savedOrder = await newOrder.save();
      const getOrder = await Order.findById(savedOrder._id).populate(
        "orderContent.itemId orderContent.addOn._id"
      );
      // Check if the amount matches with the amount calculated after the database population
      const checkBill = getOrder.orderContent.reduce(
        (a, item) =>
          a +
          (item.itemId.size[item.itemSize] +
            item.addOn.reduce((b, addon) => b + addon._id.addOnPrice, 0)) *
            item.quantity,
        0
      );
      return res.json({
        message:
          checkBill === bill
            ? "Order placed successfully"
            : "Numbers doesn't add up",
      });
    } catch (err) {
      return res.json({ error: "Error placing the order" });
    }
  };
  