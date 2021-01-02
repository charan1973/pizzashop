const { createOrder, getUserOrders } = require("../controllers/order");
const { verifyToken } = require("../validators/tokenValidator");

const router = require("express").Router()

router.post("/user/order/create", verifyToken, createOrder);
router.get("/user/order/all", verifyToken, getUserOrders);

module.exports = router