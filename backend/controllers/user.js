const Order = require("../models/Order");
const User = require("../models/User");
const Item = require("../models/Item");

exports.getUserProfile = async (req, res) => {
  try {
    const {
      address,
      email,
      firstName,
      lastName,
      fullName,
      _id,
    } = await User.findById(req.user.id);
    return res.json({
      user: { address, email, firstName, lastName, fullName, _id },
    });
  } catch (err) {
    return res.json({ error: "Error getting user" });
  }
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
  const { addressId } = req.params;
  try {
    const findUser = await User.findById(req.user.id);
    if (findUser.address.id(addressId) === null)
      return res.json({ error: "No matching address found to delete" });
    await findUser.address.id(addressId).remove();
    const savedUser = await findUser.save();
    return res.json({ message: "Address deleted" });
  } catch (err) {
    return res.json({error: "Error deleting address"})
  }
};

