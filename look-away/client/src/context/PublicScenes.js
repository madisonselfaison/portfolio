import React, { useState } from "react"
import axios from "axios"
export const PublicContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function PublicProvider(props){

    const [publicScenes, setPublicScenes] = useState([])

function getPublicScenes(){
    userAxios.get("/api/scene/")
        .then(res => {
            const sceneArray = res.data
            localStorage.setItem("Public Scenes", JSON.stringify(res.data))
            setPublicScenes([...sceneArray])
        })
        .catch(err => console.log(err.response.data.errMsg))
}

function likes(sceneId, userId){
    userAxios.put(`api/scene/favorite/${sceneId}`, userId)
    .then(res => {
        getPublicScenes()
    })
    .catch(err => console.log(err))
}

function dislikes(sceneId, userId){
    userAxios.put(`/api/scene/unfavorite/${sceneId}`, userId)
    .then(res => {
        getPublicScenes()
    })
    .catch(err => console.log(err))
}

return(
    <PublicContext.Provider
        value={{
            publicScenes,
            setPublicScenes,
            getPublicScenes,
            likes,
            dislikes
        }}
        >
            {props.children}
        </PublicContext.Provider>
        )
}