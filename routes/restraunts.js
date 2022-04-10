const router = require("express").Router();
const { getRestaunts, getAllRestaunts } = require("../controllers/restraunts");
const { isAuth } = require("../controllers/auth");

router.get("/restraunts", isAuth, getRestaunts);
router.get("/restraunts/all", isAuth, getAllRestaunts);

module.exports = router;
