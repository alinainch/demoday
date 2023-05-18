const Seq = require("../models/Seq")
module.exports = {
  get: async (req, res) => {
    try {
      const sequences = await Seq.find({madeBy: req.user.id})
      let allPoses = await fetch('https://yoga-api-nzy4.onrender.com/v1/poses');
      const posesObj = await allPoses.json();
      function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      
      let random = shuffle(posesObj).slice(0, 20);

      console.log(random, 'this is random')
      
      res.render("seq.ejs", { allPoses: random, sequences: sequences});
    } catch (err) {
      console.log(err);
    }
  },
  getPose: async (req, res) => {
    //get all the poses
    //assign a variable that will contain an array of 20 random poses
    //users can build their sequence
    try {
      console.log('checking pose')
      const userInput = req.body.pose
      let allPoses = await fetch('https://yoga-api-nzy4.onrender.com/v1/poses');
      const posesObj = await allPoses.json();
      function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      
      let random = shuffle(posesObj).slice(0, 20);

      console.log(random, 'this is random')
      const yoga = await fetch(`https://yoga-api-nzy4.onrender.com/v1/poses?name=${userInput}`);
      const yogaObj = await yoga.json()
      res.render("seq.ejs", { yogaObj: yogaObj });
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
      res.redirect('/profile')
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
}
