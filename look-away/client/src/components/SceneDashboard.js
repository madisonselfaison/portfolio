import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import CommentCard from "./CommentCard"
import CommentForm from "./CommentForm"

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function SceneDashboard({_id}){
    const [comments, setComments] = useState([])
    const [commentToggle, setCommentToggle] = useState(false)
    const [commentInput, setCommentInput] = useState({ comment: "" })

    useEffect(() => {
        console.log("useEffect for SceneDash")
        getSceneComments()
    }, [])


    function handleChange(e){
        const { name, value } = e.target
        setCommentInput(prevInputs => ({...prevInputs, [name]: value}))
    }

    function getSceneComments(){
        console.log(_id, "_id")
        userAxios.get(`/api/comment/${_id}`)
        .then(res => console.log(res.data, "test"))
        .catch(err => console.log(err))
    }

    function addComment(newComment, _id){
        console.log("newComment", newComment)
        userAxios.post(`/api/comment/${_id}`, newComment)
        .then(res => setComments(prevComments => [...prevComments, res.data]))
        .then(setCommentToggle(false))
        .then(setCommentInput(""))
        .catch(err => console.log(err))
        getSceneComments(_id)
    }

    return(
        <div>
            <ul>
                {comments ?
                    comments.map(comment =>
                        <CommentCard 
                            {...comment}
                            key={comment._id}
                        />)
                :
                null
                }
            </ul>
            {!commentToggle ? <button onClick={() => setCommentToggle(true)}>Add a comment</button> : null}
            {commentToggle ? <CommentForm 
                            handleChange={handleChange}
                            addComment={addComment}
                            setCommentToggle={setCommentToggle}
                            comment={commentInput}
                            setCommentInput={setCommentInput}
                            _id={_id}
                            />
                        : null}
        </div>
    )

}