const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/chat");
const { ensureAuth, ensureGuest } = require("../middleware/auth");




// // router.get("/", ensureAuth, chatController.getChat);

// router.post("/", ensureAuth, chatController.postChat);




module.exports = router;
