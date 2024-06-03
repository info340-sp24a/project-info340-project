import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export function HeaderBar({ currentUser, changeUserFunction }) {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        changeUserFunction(null); // Clear the user data
        navigate('/signin'); // Redirect to the sign-in page
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  return (
    <header className="header-container">
      <div className="nameAndDes">
        <h1><NavLink className="app-name" to="/">Ski Resorts</NavLink></h1>
        <p>Experience the thrill of the slopes like never before</p>
      </div>
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/upload">Upload</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/compare">Compare</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/summary">Summary</NavLink>
        </li>
        {currentUser && currentUser.userId ? (
          <>
            <li className="nav-item">
              <button className="btn btn-secondary ms-2" onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <NavLink className="nav-link" to="/signin">Sign In</NavLink>
          </li>
        )}
      </ul>
    </header>
  );
}
