const Seq = require("../models/Seq")
let posesObj = null
const fs = require('fs');

//cached on my disk. No need to fetch
function getPoses(){
  if(!posesObj){
    const data = fs.readFileSync('poses.json', 'utf8');
    posesObj = JSON.parse(data);
  }
}
getPoses()

module.exports = {
  get: async (req, res) => {
    try {
      const sequences = await Seq.find({madeBy: req.user.id})
      const userInput = req.body.getNum
      res.render("seq.ejs", { allPoses: posesObj.slice(0, userInput), sequences: sequences});
    } catch (err) {
      console.log(err);
    }
  },
  getPose: async (req, res) => {
    //get all the poses
    //assign a variable that will contain an array of 20 random poses
    //users can build their sequence
    try {
      const userInput = req.body.pose
      const yoga = await fetch(`https://yoga-api-nzy4.onrender.com/v1/poses?name=${userInput}`);
      const yogaObj = await yoga.json()
      res.render("seq.ejs", { yogaObj: yogaObj });
    } catch (err) {
      console.log(err);
    }
  },
  posesArray: async (req, res) => {
    //get all the poses
    //assign a variable that will contain an array of 20 random poses
    //users can build their sequence
    const sequences = await Seq.find({madeBy: req.user.id})
    const userInput = req.body.getNum
    try {
      res.render("seq.ejs", { allPoses: posesObj.slice(0, userInput), sequences: sequences});
    } catch (err) {
      console.log(err);
    }
  },

  addPose: async (req, res) => {
    //users can see all existing sequences 
    //create a new sequence or update a previous one 
    try {
      let poseName = req.body.poseName
      let poseImg = req.body.poseImg
      let sequenceId = req.body.sequences
      await Seq.findOneAndUpdate({ _id : sequenceId },
      {
        $push: {
         poses: {poseName: poseName, poseImg: poseImg}
        }
      });
      res.redirect('/seq')
    } catch (err) {
      console.log(err);
    }
  },

  newSeq: async (req, res) => {
    try {
      await Seq.create({
        title: req.body.title,
        madeBy: req.user.id,
        poses: []
      });
      console.log("Sequence has been added!");
      res.redirect('/seq'); 
    } catch (err) {
      console.log(err);
    }
  },
  getSeq: async (req, res) => {
    try {
      const sequence = await Seq.findById(req.params.id);
      res.render('single.ejs', { sequence: sequence});
    } catch (err) {
      console.log(err);
    }
  },
  deleteSeq: async (req, res) => {
    try {
      // Find post by id
      let seq = await Seq.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(seq.cloudinaryId);
      // Delete post from db
      await Seq.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/seq");
    } catch (err) {
      res.redirect("/seq");
    }
  },
  deletePose: async (req, res) => {
    try {
      // Find post by id
      await Seq.remove({ _id: req.params.poseID });
      console.log("Deleted Comment");
      res.redirect(`/seq/${req.params.poseID}`);
    } catch (err) {
      res.redirect(`/seq/${req.params.poseID}`);
    }
  }
}

