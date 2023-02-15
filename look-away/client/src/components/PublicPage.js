import React,  { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider"
import Scene from "./Scene"
import Graffiti from "../images/Graffiti.jpg"

const initialFilter = {
    type: ""
}

export default function PublicPage(){
    const { allPosts, handleFilter, saveAPostedScene } = useContext(UserContext)
    const [filter, setFilter] = useState(initialFilter)
    const [editPublicToggle, setEditPublicToggle] = useState(false)
    const [publicView, setPublicView] = useState(false)

    const allPostsMap = allPosts.map(post => {
        return <Scene 
            publicView={publicView}
            saveAPostedScene={saveAPostedScene}
            {...post}
            key={post._id}
            />
    })

    const { type } = filter
    return(
        <>
            <div className="public">
                <h1>Public List of Scenes</h1>
                <br></br>
                <h2>Filter</h2>
                <select className="filter-form" name="type" value={type} onChange={handleFilter}>
                        <option value="reset">All Options</option>
                        <option value="Movies">Movies</option>
                        <option value="Shows">Shows</option>
                    </select>
                    <br></br><br></br>
                    <div>
                        <img className="graffiti-pic" src={Graffiti} width="300" alt="graffiti"/>
                    </div>
                {allPostsMap}
            </div>
        </>
    )
}