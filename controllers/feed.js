const Post = require("../models/Post")
const Tracker = require("../models/Tracker")
const Comment = require("../models/Comment")

module.exports = {
  get: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const logs = await Tracker.find({ user: req.user.id }).sort({ date: "desc" }).lean();
      const comments = await Comment.find();
      console.log(posts)
      res.render("feed.ejs", { posts: posts, user: req.user, logs: logs, comments: comments});
    } catch (err) {
      console.log(err);
    }
  },
  getCategory: async (req, res) => {
    try {
      const posts = await Post.find({category: req.params.category}).sort({ createdAt: "desc" }).lean();
      const logs = await Tracker.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
      const comments = await Comment.find();
      console.log(posts)
      res.render("category.ejs", { posts: posts, user: req.user, logs: logs, comments: comments});
    } catch (err) {
      console.log(err);
    }
  },
}