const router = require("express").Router();
const {
  createAddOn,
  updateAddOn,
  deleteAddOn,
} = require("../../controllers/admin/addOn");
const { verifyToken, isAdmin } = require("../../validators/tokenValidator");

router.post("/addon/create", verifyToken, isAdmin, createAddOn);
router.put("/addon/update/:addOnId", verifyToken, isAdmin, updateAddOn);
router.delete("/addon/delete/:addOnId", verifyToken, isAdmin, deleteAddOn);

module.exports = router;
