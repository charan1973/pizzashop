const router = require("express").Router()
const { getAllOrders, updateOrderStatus } = require("../../controllers/admin/orderAdmin")
const {verifyToken, isAdmin} = require("../../validators/tokenValidator")

router.get("/order/all", verifyToken, isAdmin, getAllOrders)
router.put("/order/status/update", verifyToken, isAdmin, updateOrderStatus)

module.exports = router