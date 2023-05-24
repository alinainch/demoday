const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const Tracker = require("../models/Tracker")
const User = require("../models/User")

module.exports = {
  getProfile: async (req, res) => {
    try {

      // if we have the id param (not logged in) find the user for that id. else, return the logged in user. userToRender is a User model object
      const userToRender = req.params.id ? await User.findById(req.params.id) : req.user

      //find all posts made by the specific user
      const posts = await Post.find({ user: userToRender});

      res.render("profile.ejs", { posts: posts, user: userToRender});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const allUsers = await User.find();
      console.log(allUsers)
      res.render("feed.ejs", { posts: posts, allUsers: allUsers});
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({postID: req.params.id});
      const allUsers = await User.find();
      let userToRender = null
      for(let i = 0; i < allUsers.length; i++){
        if(allUsers[i]._id.toString() === post.user.toString()){
          userToRender = allUsers[i]
        }
      }
      res.render("post.ejs", { post: post, user: req.user, comments: comments, allUsers: allUsers, userToRender: userToRender});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        userName: req.user.userName,
        category: req.body.category
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        madeBy: req.user.id,
        postID: req.params.postID
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.postID}`); 
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      
      const thisPost = await Post.findById(req.params.id)
      thisPost.likes += 1
      thisPost.save()
      console.log("Likes +1");
      if(req.body.page == 'feed'){
        res.redirect('/feed')
      } else {
        res.redirect(`/post/${req.params.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  },
  profilePic: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      await User.findOneAndUpdate({ _id :req.user.id },
      {
        $set: {
          profilePic: result.secure_url,
        }
      });
      res.redirect('/profile')
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/feed");
    } catch (err) {
      res.redirect("/feed");
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      await Comment.remove({ _id: req.params.commentID });
      console.log("Deleted Comment");
      res.redirect(`/post/${req.params.postID}`);
    } catch (err) {
      res.redirect(`/post/${req.params.postID}`);
    }
  },
};
