const express = require("express");
const router = express.Router();

const { signUp, signIn, signOut } = require("../controllers/auth");

router.post("/signup", signUp);
router.post("/sign-in", signIn);
router.get("/signout", signOut);

module.exports = router;
