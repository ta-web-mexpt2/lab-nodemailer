const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Must define a username"]
    },
    password: {
        type: String,
        required: [true, "Must define a password"]
    },
    status: {
        type: String,
        enum: ["Pending Confirmation", "Active"],
        default: "Pending Confirmation"
    },
    confirmationCode: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Must define an email"]
    }
});

module.exports = mongoose.model("User", userSchema);