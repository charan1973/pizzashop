const Order = require("../models/Order");
const User = require("../models/User");
const Item = require("../models/Item");

exports.getUserProfile = (req, res) => {
  if (req.user.id != req.requestingUser._id)
    return res.json({ error: "You are not allowed" });

  return res.json({ user: req.requestingUser });
};

// Address Controllers
exports.addAddress = async (req, res) => {
  const {
    address: { buildingNumber, streetName, area, city, zipcode, phoneNumber },
  } = req.body;
  req.body.phoneNumber = parseInt(phoneNumber);

  if (
    !buildingNumber ||
    !streetName ||
    !area ||
    !city ||
    !zipcode ||
    !phoneNumber
  )
    return res.json({ error: "All fields are required" });

  try {
    const findUser = await User.findById(req.user.id);
    findUser.address.push(req.body);
    const savedAddress = await findUser.save();
    return res.json({ message: "Address added" });
  } catch (err) {
    return res.json({ error: "Error adding the address" });
  }
};

exports.editAddress = async (req, res) => {
  const { addressId } = req.body;
  delete req.body.addressId;

  try {
    const findUser = await User.findById(req.user.id);
    if (findUser.address.id(addressId) === null)
      return res.json({ error: "No matching address found to update" });
    const findAddress = findUser.address.id(addressId);
    findAddress.address = {
      ...findAddress.address,
      ...req.body,
    };
    const saveAddress = await findUser.save();
    return res.json({ message: "Address updated" });
  } catch (err) {
    return res.json({ error: "Cannot update address" });
  }
};

exports.deleteAddress = async (req, res) => {
  const { addressId } = req.body;
  try {
    const findUser = await User.findById(req.user.id);
    if (findUser.address.id(addressId) === null)
      return res.json({ error: "No matching address found to delete" });
    await findUser.address.id(addressId).remove();
    const savedUser = await findUser.save();
    return res.json({ message: "Address deleted" });
  } catch (err) {
    console.log(err);
  }
};

// Order controllers
exports.createOrder = async (req, res) => {
  const { orderContent, addressId, orderPrice } = req.body;

  const bill = orderContent.reduce((a, content) => {
    return (a =
      a +
      content.itemPrice +
      content.addOn.reduce((b, addOn) => b + addOn.addOnPrice, 0));
  }, 0);

  // console.log(orderPrice, bill);

  if (orderPrice !== bill)
    return res.json({ error: "There's a problem calculating the amount" });

  const findUser = await User.findById(req.user.id);
  const address = findUser.address.id(addressId)

  const newOrder = new Order({
    orderPrice: bill,
    address,
    orderContent,
    customer: req.user.id
  });

  await newOrder.save()
  return res.json({message: "Order placed"})

  // console.log(bill);
};
