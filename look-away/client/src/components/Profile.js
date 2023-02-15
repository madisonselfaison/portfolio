import React, { useContext, useEffect } from "react"
import SceneForm from "./SceneForm.js"
import SceneList from "./SceneList.js"
import { UserContext } from "../context/UserProvider.js"
import Sign from "../images/sign.jpg"
import SavedSingleScene from "./SavedSingleScene.js"

export default function Profile(){
    const {
        user: {
            username,
            _id
        },
        addScene,
        scenes,
        getUserScenes,
        savedScenes,
        savePostedScene,
        getUserSavedScenes
    } = useContext(UserContext)

    useEffect(() => {
        getUserScenes()
        getUserSavedScenes(_id)
    }, [])

    const sortedList = savedScenes.map((scene) => 
        <SavedSingleScene key={scene._id} {...scene} username={username} />
        )
    console.log(scenes, "scenes")
    return(
        <div>
            <h1 className="profile-title">Welcome @{username}!</h1>
            <h3 className="profile-title">Add a scene</h3>
        <div className="profile-page">
           <div className="profile">            
               <SceneForm addScene={addScene}/>
               <h3 className="posted-scenes">Your posted scenes</h3>
               <SceneList scenes={scenes}/>
           </div>
           <div>
                <img className="sign-img" src={Sign} width="300" alt="friends"/>
           </div>
        </div>
        <div>
            <h3 className="saved-scenes">Your saved scenes{sortedList}</h3>
           </div>
        </div>
    )

}