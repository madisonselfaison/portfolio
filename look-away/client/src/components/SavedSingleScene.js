import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider"

export default function(props) {
    const { description, scene, type } = props
 
    return (
        <div className="saved-scenes">
            <p>{scene}</p>
            <p>{description}</p>
            <p>{type}</p>
        </div>
    )
}   