import React, { useState, useContext } from "react"
import AuthForm from "./AuthForm.js"
import { UserContext } from "../context/UserProvider.js"
import Emoji from "../images/emoji.png"
import noEnter from "../images/noEnter.jpg"

const initInputs = { username: "", password: "" };

export default function Auth(){ 
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    function toggleForm(){
        setToggle(prev => !prev)
        resetAuthErr()
    }

    return(
    <>
        <div className="auth-container">
            <h1>Look Away!</h1>
            <br></br>
            <div className="info-section">
            <h3>We all know the websites you can go to if you don't want to see explicit scenes in a show/movie.</h3>
            <h3>However, no one takes into consideration THOSE scenes. You know what we're talking about... Emesis. <img src={Emoji} width="30" alt="emoji"/></h3>
            <br></br>
            <h3>If you also have trouble with scenes that include this specific type of bodily fluid, create an account below</h3>
            <h3>so you can have access to timestamps of when to LOOK AWAY from your screen.</h3>
            <br></br>
            <h3>Login below to join the Look Away! community where you can have access to the knowledge you need</h3>
            <h3>so you won't feel trapped or sick while trying to be entertained.</h3>
            </div>
            <br></br>
            { !toggle ?
            <>
                <AuthForm 
                    handleChange={handleChange}
                    handleSubmit={handleSignup}
                    inputs={inputs}
                    btnText="Sign Up"
                    errMsg={errMsg}
                />
                <button onClick={toggleForm}>Already a member?</button>
            </>
            :
            <>
                <AuthForm 
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    inputs={inputs}
                    btnText="Login"
                    errMsg={errMsg}
                />
                <button onClick={toggleForm}> Not a member? </button>
            </>
            }
        </div>
    </>
    )





}

