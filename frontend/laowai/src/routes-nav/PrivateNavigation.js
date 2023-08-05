import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/** /** "Higher-Order Component" for private navigation for logged in users. Shows up on user's page.
 *
 * When user is logged in, shows links to all features. When not,
 * no show.
 *
 * Rendered by App.
 */

function PrivateNavigation({username}) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInPrivateNav() {
    return (
        <ul className="navbar-nav.subnav-menu ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link.navbar-title-link" to={`/${username}/posts`}>
              Posts
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link.navbar-title-link" to={`/${username}/friends`}>
              Friends
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link.navbar-title-link" to={`/${username}/friend_requests`}>
              Friend Requests
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
      <nav className="Navigation navbar.subnav navbar-expand-md">
        {currentUser ? loggedInPrivateNav() : null}
      </nav>
  );
}

export default PrivateNavigation;
