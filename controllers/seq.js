const Seq = require("../models/Seq")
module.exports = {
  get: async (req, res) => {
    try {
      const yoga = await fetch('https://yoga-api-nzy4.onrender.com/v1/categories');
      const yogaObj = await yoga.json();
      res.render("seq.ejs", { yogaObj: yogaObj });
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
      res.render("seq.ejs", { yogaObj: yogaObj, allPoses: random });
    } catch (err) {
      console.log(err);
    }
  },

  postSeq: async (req, res) => {
    //users can see all existing sequences 
    //create a new sequence or update a previous one 
    try {
      
    } catch (err) {
      console.log(err);
    }
  },

  newSeq: async (req, res) => {
    try {
      const sequence = await Seq.create({
        name: req.body.name,
        madeBy: req.user.id,
        poses: []
    }); 
    req.session.sequence = sequence._id
     } catch (err) {
      console.log(err);
    }
  },
}

//store information in the session. add new sequence id into the session 
//create a sequence
//sequence has an id  - sequence._id
//store sequence id to session
