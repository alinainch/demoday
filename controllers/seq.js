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
  }
}

