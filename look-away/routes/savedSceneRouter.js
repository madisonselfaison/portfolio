const express = require('express')
const savedSceneRouter = express.Router()
const SavedScene = require('../models/savedScene.js')


// delete saved scene
savedSceneRouter.delete(`/:savedSceneId`, (req, res, next) => {
    SavedScene.findOneAndDelete(
        { _id: req.params.savedSceneId, savedBy: req.auth._id },
        (err, deletedSavedScene) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send("Successfully deleted scene.")
        }
    )
})

module.exports = savedSceneRouter