import React from "react"

export default function AuthForm(props){
    const{
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        inputs: {
            username,
            password
        }
    } = props

    return(
        <form className="login-form" onSubmit={handleSubmit}>
            <>
                <p>Username:</p>
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                />
            </>
            <>
                <p>Password:</p>
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                />
            </>
            <button>{btnText}</button>
            <h4 style={{color: "red"}}>{errMsg}</h4>
        </form>
    )



}