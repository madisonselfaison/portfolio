import React, { useContext, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./Navbar.js"
import Auth from "./components/Auth.js"
import Profile from "./components/Profile.js"
import PublicPage from "./components/PublicPage.js"
import { UserContext } from "./context/UserProvider"
import ProtectedRoute from "./components/ProtectedRoute"
import SceneDashboard from "./components/SceneDashboard.js"
import SavedScenes from "./components/SavedScenes.js"

export default function App(){
    const { token, logout, upKeepPosts } = useContext(UserContext)

    useEffect(() => {
        upKeepPosts()
    }, [])

    return(
        <div className="app">
            { token && <Navbar logout={logout} token={token}/> }
            <Routes>
                <Route 
                    path="/"
                    element={token ? <Navigate to="/profile"/> : <Auth />}
                />
                <Route 
                    path="/profile"
                    element={<ProtectedRoute token={token} redirectTo="/">
                        <Profile />
                    </ProtectedRoute>}/>
                    <Route path="saved_scenes" element={<SavedScenes />} />
                <Route 
                    path="/public"
                    element={<ProtectedRoute token={token} redirectTo="/">
                        <PublicPage />
                    </ProtectedRoute>}
                />
                <Route 
                    path="/sceneComments"
                    element={<ProtectedRoute token={token} redirectTo="/">
                        <SceneDashboard />
                    </ProtectedRoute>}
                />
            </Routes>
        </div>
    )
}