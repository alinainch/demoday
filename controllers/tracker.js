const Tracker = require("../models/Tracker")
const User = require("../models/User")
const { ObjectID } = require("mongodb");

module.exports = {
  get: async (req, res) => {
    try {
      const posts = await Tracker.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
      res.render("tracker.ejs", { tracker: posts, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  post: async (req, res) => {
    try {
      await Tracker.create({
        user: new ObjectID(req.user.id),
        log: req.body.log,
        date: req.body.date,
        userName: req.user.userName
      });
      console.log("Log has been added!");
      res.redirect("/tracker");
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    try {
      // Delete post from db
      await Tracker.remove({ _id: req.params.id });
      res.redirect("/tracker");
    } catch (err) {
      res.redirect("/tracker");
    }
  }
}