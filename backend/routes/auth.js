const router = require("express").Router();
const { signUp, signIn, signOut, getUserRole } = require("../controllers/auth");
const { verifyToken } = require("../validators/tokenValidator");

router.post("/signup", signUp);
router.post("/signin", signIn);

// Get user role on refresh
router.get("/user/get-role", verifyToken, getUserRole)

router.post("/signout", signOut)


module.exports = router;
