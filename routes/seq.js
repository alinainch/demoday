const express = require("express");
const router = express.Router();
const seqController = require("../controllers/seq");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Tracker
router.get("/", ensureAuth, seqController.get);

router.get("/pose", ensureAuth, seqController.getPose);

module.exports = router;