import React, {useState, useContext} from "react"
import { UserContext } from "../context/UserProvider"

const initInputs = {
    scene: "",
    description: "",
    type: ""
}

export default function SceneForm(props){
    const [inputs, setInputs] = useState(initInputs)
    const { addScene, submitEdit, _id } = props
  

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addScene(inputs, _id)
        setInputs(initInputs)
    }
    console.log(inputs, "inputs")
    const { scene, description, type } = inputs
    return(
        <form className="profile-form" onSubmit={handleSubmit}>
             <h4>Keep track of when to look away!</h4>
                <h3>Name</h3>
                <input 
                    type="text"
                    name="scene"
                    value={scene}
                    onChange={handleChange}
                    placeholder={"Scene"}
                />
                <h3>Movie or Shows?</h3>
                <select className="filter-form" name="type" value={type} onChange={handleChange}>
                    <option value="reset">All Options</option>
                    <option value="Movies">Movie</option>
                    <option value="Shows">Show</option>
                </select>
                <h3>Description</h3>
                <input 
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    placeholder={"Description"}
                />            
            <button 
            // onClick={() => {submitEdit(inputs, _id)}}
            >Submit</button>
        </form>
    )
}