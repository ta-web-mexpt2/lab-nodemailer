const  {Schema, model} = require("mongoose");

const userSchema = new Schema ({
  username: {
    type: String,
  },
  password:  {
    type: String,
  },
  status: {
    type: String, 
    enum: ["Pending confirmation", "Active"],
    default: "Pending confirmation"
  },
  confirmationCode: {
    type: String,
  },
  email: {
    type: String,
  }
}, 

 module.exports = model("User", userSchema);