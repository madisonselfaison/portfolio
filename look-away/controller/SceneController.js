const Scene = require("../models/scene.js")
const SavedScene = require("../models/savedScene")
// const Scene = require("../models/scene")
const asyncHandler = require('express-async-handler')

class SceneController{
    getUsersScenes = async (req, res) => {
        try {
            const scenes = await  Scene.find({ user: req.auth._id}).exec();
                        
            const savedScenes = await SavedScene.find({ savedBy: req.auth._id})
                .populate("postedBy", "username")
                .populate("savedBy", "username")
                .exec();
            console.log(savedScenes, "savedScenes")
            const combinedScenes = scenes.concat(savedScenes);
                console.log(combinedScenes, "combinedScenes")
            return res.status(200).send(combinedScenes)

        } catch (err){

        }
    }
}

module.exports = {
    combinedScenes}