import React from 'react';
import { Link } from 'react-router-dom';

export function HeaderBar(props) {
  return (
    <header className="header-container">
      <div className="nameAndDes">
        <h1><Link className="app-name" to="/">Ski Resorts</Link></h1>
        <p>Experience the thrill of the slopes like never before</p>
      </div>
      <ul className="nav">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/upload">Upload</Link>
        </li>
        <li className="nav-item">
          <Link to="/compare">Compare</Link>
        </li>
        <li className="nav-item">
          <Link to="/summary">Summary</Link>
        </li>
      </ul>
    </header>
  );
}