import "./NavBar.css"
import React from 'react'
import { Link } from 'react-router-dom'


export default function NavBar() {
    return (
        <nav className="navbar">
            <Link className='navbar-link' to={"/"}>Super People</Link>
        </nav>
    )
}
