const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  log: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Tracker", TrackerSchema);
