const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/comment.js")

//get all comments from one scene
commentRouter.get("/:sceneId", (req, res, next) => {
    Comment.find(
        { sceneId: req.params.sceneId },
        (err, comments) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            res.status(200).send(comments)
        }
    )
})

//add new comment
commentRouter.post("/:sceneId", (req, res, next) => {
    req.body.userId = req.auth._id
    req.body.username = req.auth.username
    req.body.sceneId = req.params.sceneId
    const newComment = new Comment(req.body)
    newComment.save(
        (err, newComment) => {
            if (err) {
                res.status(500)
                next(err)
            }
            return res.status(201).send(newComment)
        }
    )
})

//delete (edit) comment 
commentRouter.delete("/:sceneId/:commentId", (req, res, next) => {
    Comment.findByIdAndDelete(
        { _id: req.params.commentId, user: req.user._id, scene: req.params.sceneId },
        (err, deletedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.send(deletedComment)
        })
})

module.exports = commentRouter