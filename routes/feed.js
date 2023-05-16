const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Tracker
router.get("/", ensureAuth, feedController.get);

router.get("/:category", ensureAuth, feedController.getCategory);

module.exports = router;