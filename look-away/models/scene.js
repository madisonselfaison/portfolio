const mongoose = require("mongoose")
const Schema = mongoose.Schema


const sceneSchema = new Schema({
    scene: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    favorite: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
})

module.exports = mongoose.model("Scene", sceneSchema)
