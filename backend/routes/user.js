const router = require("express").Router();
const {
  getUserProfile,
  getUserProfileById,
  addAddress,
  editAddress,
  deleteAddress,
  createOrder,
} = require("../controllers/user");
const { verifyToken } = require("../validators/tokenValidator");

router.get("/user/:userId", verifyToken, getUserProfile);

// Address Routes
router.post("/user/address/add", verifyToken, addAddress);
router.put("/user/address/edit", verifyToken, editAddress);
router.delete("/user/address/delete", verifyToken, deleteAddress);

//Order Routes
router.post("/user/order/create", verifyToken, createOrder);

module.exports = router;
