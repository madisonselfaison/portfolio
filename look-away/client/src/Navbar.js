import React from "react"
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom"

export default function Navbar(props){
    const { logout } = props
    return(
        <Nav className="navbar">
            <Nav.Item>
                <Link to="/profile" className="nav-btn">Profile</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="./public" className="nav-btn">Public</Link>
            </Nav.Item>
            <Nav.Item>
                <Button className="nav-btn" onClick={logout}>Logout</Button>
            </Nav.Item>

        </Nav>
    )
}