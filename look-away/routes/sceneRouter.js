const express = require("express");
const sceneRouter = express.Router()
const Scene = require("../models/scene.js")
const SavedScene = require("../models/savedScene")

// get all of user's saved scenes
sceneRouter.get("/user/:userId", (req, res, next) => {
    Scene.find({ favorite: req.params.userId }, (err, scenes) => { 
           if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(scenes)
    })
})

// save new scene
sceneRouter.put("/:sceneId", (req, res, next) => {
    Scene.findByIdAndUpdate(
        { _id: req.params.sceneId},
        { $addToSet: {favorite: req.auth._id}},
        {new: true},
        (err, updatedScene) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedScene)
        })
    })
        
//get all scenes
sceneRouter.get("/", (req, res, next) => {
    Scene.find((err, scenes) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(scenes)
    })
    // .get(SceneController.combinedScenes)
});

//get scene by userId
sceneRouter.get("/user", (req, res, next) => {
    Scene.find({user: req.auth._id}, (err, scenes) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(scenes)
    })
})
   
//add a new scene
sceneRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    req.body.username = req.auth.username
    const newScene = new Scene(req.body)
    newScene.save((err, savedScene) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedScene)
    })
})

//delete scene
sceneRouter.delete("/:sceneId", (req, res, next) => {
    Scene.findOneAndDelete(
        { _id: req.params.sceneId, user: req.auth._id },
        (err, deletedScene) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted scene: ${deletedScene.scene}`)
        }
    )
})

// update scene
sceneRouter.put("/edit/:sceneId", (req, res, next) => {
    console.log("scene edit function")
    Scene.findOneAndUpdate(
        { _id: req.params.sceneId, user: req.auth._id },
        req.body,
        { new: true },
        (err, updatedScene) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedScene)
        }
    )
})

//get by type
sceneRouter.get("/search/type", (req, res, next) => {
    Scene.find({ type: req.query.type }, (err, scene) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(scene)
    })
})

//favorite a post 
sceneRouter.put("/favorite/:sceneId", (req, res, next) => {
    Scene.findByIdAndUpdate(
        {_id: req.params.sceneId},
        { $addToSet: {favorite: req.auth._id},
          $pull: {unFavorite: req.auth._id}},
        {new: true},
        (err, updatedScene) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedScene)
        })
    })

//unfavorite a post 
sceneRouter.put("/unfavorite/:sceneId", (req, res, next) => {
    Scene.findByIdAndUpdate(
        {_id: req.params.sceneId},
        { $addToSet: {unFavorite: req.auth._id},
          $pull: {favorite: req.auth._id}},
        {new: true},
        (err, updatedScene) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedScene)
        })
    })

module.exports = sceneRouter