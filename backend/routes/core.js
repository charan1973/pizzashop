const router = require("express").Router()

const { getAllCategory, getAllItem, getAllAddOn } = require("../controllers/core")

router.get("/category/all", getAllCategory)
router.get("/item/all", getAllItem)
router.get("/addon/all", getAllAddOn)

module.exports = router