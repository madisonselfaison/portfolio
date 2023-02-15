const mongoose = require("mongoose")
const Schema = mongoose.Schema

const savedSceneSchema = new Schema({
    text: {
        type: Schema.Types.ObjectId,
        ref: "Scene"
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
    // savedBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // }
})

module.exports = mongoose.model("SavedScene", savedSceneSchema)