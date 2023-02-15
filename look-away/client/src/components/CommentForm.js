import React from "react"

export default function CommentForm(props){
    const{
        handleChange,
        addComment,
        setCommentToggle,
        comment,
        setCommentInput,
        _id
    } = props

    return(
        <form onSubmit={() => addComment(comment, _id)}>
            <>
                <input 
                    type="text"
                    name="comment"
                    value={comment.comment}
                    onChange={handleChange}
                />
            </>
            <button className="comment-btn" type="submit">Add comment</button>
            <button onClick={() => {
                setCommentToggle(false)
                setCommentInput({comment: ""})
            }}>Cancel</button>
        </form>
    )
}