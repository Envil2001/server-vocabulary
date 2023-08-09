const { Schema, model } = require("mongoose");


const FolderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        viewsCount: { type: Number, default: 0 },
        words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
    },
    {
        timestamps: true
    }
)

module.exports = model("Folder", FolderSchema);