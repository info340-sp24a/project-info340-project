import React from 'react';
import { NavLink } from 'react-router-dom';

export function HeaderBar(props) {
    return (
<header className="header-container">
    <div className="nameAndDes">
    <h1><NavLink className="app-name" to="/index">Ski Resorts</NavLink></h1>
    <p>Experience the thrill of the slopes like never before</p>
    </div>
    <ul className="nav">
        <li className="nav-item">
            <NavLink to="/index">Home</NavLink>
        </li>
        <li className="nav-item">
            <NavLink to="/upload">Upload</NavLink>
        </li>
        <li className="nav-item">
            <NavLink to="/compare">Compare</NavLink>
        </li>
    </ul>
    <a id="signin">Sign In</a>
</header>
);
}