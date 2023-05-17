const Post = require("../models/Post")
const Tracker = require("../models/Tracker")
const Comment = require("../models/Comment")
const User = require("../models/User")


module.exports = {
  get: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const logs = await Tracker.find({ user: req.user.id }).sort({ date: "desc" }).lean();
      const comments = await Comment.find();
      const allUsers = await User.find();
  
      res.render("feed.ejs", { posts: posts, user: req.user, logs: logs, comments: comments, allUsers: allUsers});
    } catch (err) {
      console.log(err);
    }
  },
  getCategory: async (req, res) => {
    try {
      const posts = await Post.find({category: req.params.category}).sort({ createdAt: "desc" }).lean();
      const logs = await Tracker.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
      const comments = await Comment.find();
    
      res.render("category.ejs", { posts: posts, user: req.user, logs: logs, comments: comments});
    } catch (err) {
      console.log(err);
    }
  },
}