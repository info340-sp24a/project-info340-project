import React from 'react';


export function HeaderBar(props) {
    return (
<header className="header-container">
    <div className="nameAndDes">
    <h1><a className="app-name" href="index.html">Ski Resorts</a></h1>
    <p>Experience the thrill of the slopes like never before</p>
    </div>
    <ul className="nav">
        <li className="nav-item">
            <a href="index.html">Home</a>
        </li>
        <li className="nav-item">
            <a href="upload.html">Upload</a>
        </li>
        <li className="nav-item">
            <a href="compare.html">Compare</a>
        </li>
    </ul>
    <a id="signin">Sign In</a> 
</header>
);
}