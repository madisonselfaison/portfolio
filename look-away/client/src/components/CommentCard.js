import React from "react"

export default function CommentCard(props) {
    const {comment, username} = props
    
    return(
        <>
            Username: {username}
                <br></br>
            Comment: {comment}
        </>
    )
}