const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
      type: String,
      required: [true, "Add a username"]
  },
  email: {
    type: String,
    required: [true, "Email is needed"]  
  },
  password: {
    type: String,
    required: [true, "Create a password"]
  },
  status: {
      type: String,
      enum: ["Pending Confirmation", "Active"],
      default: "Active"
  },
  confirmationCode: {
      type: String,
      unique: true,
  }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;
