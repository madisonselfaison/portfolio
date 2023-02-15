import React, {useState} from "react"
import Scene from "./Scene"

export default function SceneList(props){
    const { scenes } = props
    const [publicView, setPublicView] = useState(true)

    console.log(scenes, "scenes")

    const postList = scenes.map( item => {
        return <Scene 
                {...item}
                publicView={publicView}
                key={item._id}
                />
            })

        return (
            <div className="scene-list"> 
                {postList}
            </div>
        )
    }
