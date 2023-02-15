import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

export default function PublicScene(props){
    const navigate = useNavigate()
    const {scene, description, _id} = props

    return( 
        <div className="public">
            <h1>{scene}</h1>
            <p>{description}</p>
            <button
                onClick={() => {
                    navigate(`/scene/${_id}`, {state: {scene}})
                }}>
                </button>
                
        </div>
    )
}