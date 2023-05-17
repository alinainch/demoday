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
    try {
      console.log('checking pose')
      const userInput = req.body.pose
      const yoga = await fetch(`https://yoga-api-nzy4.onrender.com/v1/poses?name=${userInput}`);
      const yogaObj = await yoga.json()
      res.render("seq.ejs", { yogaObj: yogaObj });
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
  }
}

//store information in the session. add new sequence id into the session 
//create a sequence
//sequence has an id  - sequence._id
//store sequence id to session
