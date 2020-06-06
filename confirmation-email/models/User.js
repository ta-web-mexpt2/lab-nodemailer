const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Debes mandar un path para tu foto"],
  },
  password: {
    type: String,
    required: [true, "Debes mandar un path para tu foto"],
  },
  status: {
    type: String,
    enum: ["Pending Confirmation", "Active"],
    default: "Pending Confirmation",
  },
  confirmationCode: {
    type: String,
  },
  email: {
    type: String,
  }
},
{ timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)