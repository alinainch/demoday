const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Post Routes - simplified for now


router.get("/post/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.post("/createComment/:postID", postsController.createComment);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

router.delete("/deleteComment/:postID/:commentID", postsController.deleteComment);

//Tracker
router.get("/getTracker", ensureAuth, postsController.getTracker);

router.post("/createTracker", postsController.createTracker);

module.exports = router;
