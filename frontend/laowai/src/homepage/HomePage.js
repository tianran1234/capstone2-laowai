import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function HomePage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  
  return (
      <div className="Homepage">
        <div className="container text-center">
          <h1 className="mb-4 font-weight-bold">Welcome to LaoWai</h1>
          <p className="lead">Get connected and stay tuned.</p>
          {!currentUser
          ? (
            <p>
              <Link className="btn btn-primary font-weight-bold mr-3"
                    to="/auth/login">
                Log in
              </Link>
              <Link className="btn btn-primary font-weight-bold"
                    to="/auth/signup">
                Sign up
              </Link>
            </p>
          ) : <h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
  
        }
      </div>
    </div>
  );
}



export default HomePage;
