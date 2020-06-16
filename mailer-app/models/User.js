//Iteration 1 - User Model
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username must be added"],
        },
        password: {
            type: String,
            required: [true, "A password must be added"],
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
            required: [true, "Email address must be added"],
            validate: {
                message: "This email is already in use",
                validator: async (email) => {
                    const items = await models["User"].count({ email });
                    return items < 1;
                },
            },
        },
    },
);

module.exports = model("User", userSchema);