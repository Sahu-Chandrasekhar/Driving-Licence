const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        authType:{
            type: String,
            enum:["Admin","User"],
            default:"User"
        },
        name: {
            type: String
        },
        email: {
            type: String,
        },
        phone: {
            type: Number,
        },
        password: {
            type: String,
        },
        gender: {
            type: String,
        },
        dluser: [{
            type: Schema.Types.ObjectId,
            ref: 'DLUser',
        }],
        
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);
module.exports = User;