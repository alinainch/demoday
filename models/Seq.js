const mongoose = require("mongoose");

const SeqSchema = new mongoose.Schema({
  //name of each sequence 
  title: {
    type: String,
    required: true,
  },
  madeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //contains poses in the sequence
  poses: {
    type: mongoose.Schema.Types.Array,
    required: true
  }
});

module.exports = mongoose.model("Sequence", SeqSchema);
