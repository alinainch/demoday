const express = require("express");
const router = express.Router();
const trackerController = require("../controllers/tracker");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Tracker
router.get("/", ensureAuth, trackerController.get);

router.post("/", trackerController.post);

router.delete("/:id", trackerController.delete);

module.exports = router;