import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import SceneForm from "./SceneForm.js"
import { UserContext } from "../context/UserProvider"
import SceneDashboard from "./SceneDashboard"

export default function Scene(props){
    const navigate = useNavigate()

    const {     editScene,  
                deleteScene, 
                saveAPostedScene 
            } = useContext(UserContext)
    const {     scene, 
                description,
                username, 
                _id,  
                publicView, 
                type, 
            } = props
    const [editToggle, setEditToggle] = useState(false)

    function submitEdit(inputs, _id){
        console.log("submit edit")
        editScene(inputs, _id)
        setEditToggle(false)
    }

    return(
        <div className="scenes">
            <p><strong>Scene:</strong> {scene}</p>
            <p><strong>Movie or Show?</strong> {type}</p>
            <p><strong>Description:</strong> {description}</p>
            <p>posted by: @{username}</p>
            {publicView ? <span></span>
            :
                <button onClick={() => saveAPostedScene(_id)}>Save to my list of scenes</button>
            }
          
        { editToggle && <SceneForm 
                            addScene={submitEdit} 
                            _id={_id} 
                            scene={scene} 
                            description={description}
                            type={type}
                            />            
            }
            <div className="edit-btns">
                { publicView && 
                    <button className="editbtn"
                     onClick={() => setEditToggle(prev => !prev)}>
                            {editToggle ? 'Cancel' : 'Edit'}
                    </button>}
                {publicView && 
                    <button className="delbtn"
                        onClick={() => deleteScene(_id)}>
                            Delete 
                    </button>}
                <SceneDashboard {...props}/>
            </div>
        </div>
    )
}