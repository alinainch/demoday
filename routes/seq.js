const express = require("express");
const router = express.Router();
const seqController = require("../controllers/seq");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Tracker
router.get("/", ensureAuth, seqController.get);

router.post("/", ensureAuth, seqController.get);

router.post("/pose", ensureAuth, seqController.getPose);

router.get("/media", ensureAuth, seqController.getMedia);

router.post("/newSeq", ensureAuth, seqController.newSeq);

router.post("/getFeedback/:id", ensureAuth, seqController.getFeedback);

router.post("/input", ensureAuth, seqController.posesArray);

router.put("/addPose", ensureAuth, seqController.addPose);

router.get("/:id", ensureAuth, seqController.getSeq);

router.delete("/deleteSeq/:id", seqController.deleteSeq);

router.delete("/deletePose/:seqID/:poseID", seqController.deletePose);

module.exports = router;