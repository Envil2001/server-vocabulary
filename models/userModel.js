const { Schema, model } = require("mongoose");


const UserSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    colorAvatar: { type: String },
    aboutInfo: { type: String },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    avatarPath: { type: String, default: "" },
})

module.exports = model("User", UserSchema);