const { createItem, updateItem, deleteItem } = require("../../controllers/admin/item")
const { verifyToken, isAdmin } = require("../../validators/tokenValidator")

const router = require("express").Router()

router.post("/item/create", verifyToken, isAdmin, createItem)
router.put("/item/update/:itemId", verifyToken, isAdmin, updateItem)
router.delete("/item/delete/:itemId", verifyToken, isAdmin, deleteItem)

module.exports = router