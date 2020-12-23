const { createItem, updateItem, deleteItem } = require("../../controllers/admin/item")
const { verifyToken, isAdmin } = require("../../validators/tokenValidator")
const {multerUpload} = require("../../config/multer-setup")

const router = require("express").Router()

router.post("/item/create", verifyToken, isAdmin, multerUpload.single("image"), createItem)
router.put("/item/update/:itemId", verifyToken, isAdmin, updateItem)
router.delete("/item/delete/:itemId", verifyToken, isAdmin, deleteItem)

module.exports = router