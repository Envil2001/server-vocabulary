const { Schema, model } = require("mongoose");


const WordSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    post_id: { type: Schema.Types.ObjectId, ref: 'Folder' },
    title: { type: String, require: true },
    translate: { type: String, require: true },
    description: { type: String },
},
    {
        timestamps: true
    }
)

module.exports = model("Word", WordSchema);