import React, { useState, useContext } from "react"
import axios from "axios"
import { PublicContext } from "./PublicScenes"

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const { setPublicScenes, getPublicScenes } = useContext(PublicContext)

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        scenes: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [allPosts, setAllPosts] = useState([])
    const [savedScenes, setSavedScenes] = useState([])

    function getAllPosts(){
        userAxios.get(`/api/scene`)
        .then(res => {
            setAllPosts(res.data)
        })
        .catch(err => console.log(err))
    }

    //signup
    function signup(credentials){
        axios.post("auth/signup", credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    //login
    function login(credentials){
        axios.post("auth/login", credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            getUserScenes()
            getAllPosts()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    //logout
    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            scenes: []
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    //get user's scenes
    function getUserScenes(){
        userAxios.get("api/scene/user")
        .then(res => {
            console.log(getUserScenes, "getuserscenes")
            setUserState(prevState => {
                return {
                ...prevState,
                scenes: res.data
                }
            })
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    //add scene
    function addScene(newScene){
        userAxios.post("/api/scene", newScene)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                scenes: [...prevState.scenes, res.data]
            }))
            setAllPosts(prevState => ([
                ...prevState,
                res.data
            ]))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    //delete scene
    function deleteScene(sceneId){
        console.log("deleteScene", "id", sceneId)
        userAxios.delete(`/api/scene/${sceneId}`)
        .then(res => {
            console.log(res.data)
            getUserScenes()
            getPublicScenes()
        })
        .catch(err => console.log(err))
    }

    //edit Scene
    function editScene(updates, sceneId){
        console.log("sceneId", sceneId)
        console.log("updates", updates)
        userAxios.put(`/api/scene/edit/${sceneId}`, updates)
        .then(res => {
            console.log(res.data, "res.data")
            getUserScenes()
            getPublicScenes()
        })
        .catch(err => console.log(err))
    }

    function upKeepPosts(){
        getAllPosts()
        getUserScenes()
    }

    // get saved scenes
    function getUserSavedScenes(userId) {
        userAxios.get(`/api/scene/user/${userId}`)
        .then(res => {
            setSavedScenes(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // save scene
    function saveAPostedScene(sceneId){
        userAxios.put(`api/scene/${sceneId}`)
        .then(res => {
            console.log(res.data)
            setSavedScenes(prevSavedScenes => prevSavedScenes.map(post => sceneId !== post._id ? post: res.data))
        })
        .catch(err => console.log(err))
    }

    //delete saved scene
    function deleteSavedScene(savedSceneId){
        userAxios.delete(`/api/saved_scene/${savedSceneId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data.errMsg))
        getUserSavedScenes()
    }

    //get type
    function handleFilter(e){
        if(e.target.value === "reset"){
            getAllPosts()
        } else {
            userAxios.get(`/api/scene/search/type?type=${e.target.value}`)
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))
        }
    }

    return(
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                addScene,
                resetAuthErr,
                getUserScenes,
                deleteScene,
                editScene,
                allPosts,
                upKeepPosts,
                getUserSavedScenes,
                saveAPostedScene,
                deleteSavedScene,
                handleFilter,
                savedScenes
            }}>
                { props.children }
        </UserContext.Provider>
    )
}


