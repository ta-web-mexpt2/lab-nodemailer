var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "elige username"],
    },
    
    password: {
        type: String,
        required: [true, "escribe un pswrd"]
    },

    status: {
        type: String,
        default:"Pending Confirmation",
        enum: ["Pending Confirmation", "Active" ],
    },

    confirmationCode: {
        type:String,
    },

    email:{
        type:String,
        required: [true, "escribe email"]
    },

})

module.exports =  mongoose.model("User", userSchema)

