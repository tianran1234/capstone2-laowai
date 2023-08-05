import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SearchForm from "../common/SearchForm";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to all features. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {

  const { currentUser } = useContext(UserContext);

  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      <div>
        
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
          <SearchForm />
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/announcements">
              Announcements
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/forum">
              Forum
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to={`/users/${currentUser.username}`}>
              Account
            </NavLink>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logout}>
              Log out {currentUser.first_name || currentUser.username}
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  function loggedOutNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/announcements">
              Announcements
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/forum">
              Forum 
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/auth/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/auth/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
    );
  }
  
  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        LaoWai
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav() }
    </nav>
  );
}

export default Navigation;
