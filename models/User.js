const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { 
    type: String,
    unique: true 
  },
  email: { 
  type: String,
  unique: true 
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  profilePic: {
    type: String,
    default: ('/images/yoga.jpg')
  },
  password: String,
  friends: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
}]
});

// friends is an [array] of the same schema (UserSchema) so we have to reference it by the model name ("User")

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
  
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
