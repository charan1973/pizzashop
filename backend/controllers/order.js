const User = require("../models/User");
const Order = require("../models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require("uuid");
const { getRounds } = require("bcryptjs");
const { use } = require("../routes/order");

// Order controllers
exports.createOrder = async (req, res) => {
  const { orderContent, addressId, token } = req.body;

  // Calculate amount coming from frontend
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

    // Check if the amount from frontend and backend sums up
    if (checkBill !== bill) {
      getOrder.orderStatus = "cancelled"; // If doesn't match set orderStatus as cancelled
      await getOrder.save();
      return res.json({ error: "Numbers doesn't match!" });
    }

    const idempotencyKey = uuid(); // Key for stripe

    const charge = await stripe.charges.create(
      // Create charge and save
      {
        amount: checkBill * 100,
        currency: "inr",
        receipt_email: token.email,
        source: token.id,
        description: `${token.email} pizza order`,
        shipping: {
          name: token.card.name,
          address: {
            line1: `${getOrder.address.address.buildingNumber}, 
                    ${getOrder.address.address.streetName}, 
                    ${getOrder.address.address.city}`,
            country: "India",
          },
        },
      },
      { idempotencyKey }
    );

    getOrder.paymentDetails = {
      id: charge.id,
      object: charge.object,
      amount: charge.amount,
      amount_captured: charge.amount_captured,
      customer: charge.customer,
      description: charge.description,
      paymentMethod: charge.payment_method_details.type,
    };
    getOrder.paymentStatus = true;
    await getOrder.save();

    return res.json({ message: "Order placed successfully!" });
  } catch (err) {
    if (err.type === "StripeCardError") {
      return res.json({ error: err.raw.code });
    }
    res.json({ error: "Error placing order" });
  }
};

exports.getUserOrders = async (req, res) => {
  const page = req.query.page * 5;
  try {
    const userOrders = await Order.find(
      { customer: req.user.id },
      "-paymentDetails -orderContent"
    )
      .limit(page)
      .sort("-createdAt");
    return res.json({ order: userOrders });
  } catch (err) {
    return res.json({ error: "Error fetching orders" });
  }
};
