import React from "react"
import './navbar.css'

export default function Navbar () {

    return(
        <div className="navbar">
            <div className="nav--section1">
                <span className="title">The Artifact</span>
                <span className="sub-title">Culture & Art blog</span>
            </div>
            <div className="nav--section2">
                <span className="nav-links">Blog</span>
                <span className="nav-links">About</span>
                <span className="nav-links">Contact</span>
            </div>
        </div>
    );
}