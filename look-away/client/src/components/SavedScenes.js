import React,  {useContext, useEffect } from "react"
import { UserContext } from "../context/UserProvider"
import SavedSingleScene from "./SavedSingleScene.js"

export default function SavedScenes(){
    const {
        savedScenes,
        getUserSavedScenes,
        saveAPostedScene
    } = useContext(UserContext)

    useEffect(() => {
        getUserSavedScenes()
    }, [])

    return(
        <div className="saved-container">
            <h3>Your saved scenes</h3>
            <SavedSingleScene savedScenes={savedScenes} saveAPostedScene={saveAPostedScene} />
        </div>
    )
}