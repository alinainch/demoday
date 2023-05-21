const Seq = require("../models/Seq")
let posesObj = null
const fs = require('fs');
const { ObjectID } = require("mongodb");




//cached on my disk. No need to fetch
function getPoses() {
  if (!posesObj) {
    const data = fs.readFileSync('poses.json', 'utf8');
    posesObj = JSON.parse(data);
  }
}
getPoses()

module.exports = {
  get: async (req, res) => {
    try {
      const sequences = await Seq.find({ madeBy: req.user.id })
      const userInput = req.body.getNum
      res.render("seq.ejs", { allPoses: posesObj.slice(0, userInput), sequences: sequences });
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
    const sequences = await Seq.find({ madeBy: req.user.id })
    const userInput = req.body.getNum
    try {
      res.render("seq.ejs", { allPoses: posesObj.slice(0, userInput), sequences: sequences });
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
      let poseID = new ObjectID()
      await Seq.findOneAndUpdate({ _id: sequenceId },
        {
          $push: {
            poses: { poseName: poseName, poseImg: poseImg, poseID: poseID }
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
      res.render('single.ejs', { sequence: sequence });
    } catch (err) {
      console.log(err);
    }
  },
  deleteSeq: async (req, res) => {
    try {
      // Delete sequence from db
      await Seq.findByIdAndDelete(req.params.id)
      console.log("Deleted Post");
      res.redirect("/seq");
    } catch (err) {
      console.log(err)
      res.redirect("/seq");
    }
  },
  deletePose: async (req, res) => {
    try {
      //need to convert params.poseID to an objectid to match db! Otherwise would be a type mismatch and it was comparing a string 
      let sequence = await Seq.findOneAndUpdate({ _id: req.params.seqID },
        {
          $pull: {
            poses: { poseID: new ObjectID(req.params.poseID)}
          }
        },
        { new: true }
      );
      console.log(sequence)
      // Find sequence by id

      console.log("Deleted Pose");
      res.redirect(`/seq/${req.params.seqID}`);
    } catch (err) {
      res.redirect(`/seq/${req.params.seqID}`);
    }
  }
}

