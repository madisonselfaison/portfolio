const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const {expressjwt} = require("express-jwt")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect(
    "mongodb+srv://MadCoder:123@cluster0.h1iqael.mongodb.net/?retryWrites=true&w=majority",
    () => console.log("Connected to the DB")
)

app.use("/auth", require("./routes/authRouter"))
app.use("/api", expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] }))
app.use("/api/comment", require("./routes/commentRouter.js"))
app.use("/api/scene", require("./routes/sceneRouter.js"))
app.use("/api/saved_scene", require("./routes/savedSceneRouter.js"))

//error handler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})


app.listen(7000, () => {
    console.log("The server is running on port 7000")
})