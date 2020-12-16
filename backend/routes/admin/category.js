const router = require("express").Router()

const { createCategory, deleteCategory } = require("../../controllers/admin/category")
const { verifyToken, isAdmin } = require("../../validators/tokenValidator")


router.post("/category/create", verifyToken, isAdmin, createCategory)
router.delete("/category/delete/:categoryId", verifyToken, isAdmin, deleteCategory)



module.exports = router