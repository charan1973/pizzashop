const { createOrder } = require("../controllers/order");
const { verifyToken } = require("../validators/tokenValidator");

const router = require("express").Router()

router.post("/user/order/create", verifyToken, createOrder);

module.exports = router