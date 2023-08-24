import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LaoWaiApi from "../api/api";
import PrivateNavigation from "../routes-nav/PrivateNavigation";
import UserProfile from "./UserProfile"
import FriendRequest from "../friends/FriendRequest";
import UnfriendButton from "../friends/UnfriendButton";
import UserContext from "../auth/UserContext";

/** User page.
 *
 * Renders information about a user.
 *
 * Routed at /:username
 *
 * Routes -> UserPage 
 */

function UserPage() {

  const { username } = useParams();

  const { currentUser } = useContext(UserContext);

  console.debug("UserPage", "name=", username);
  
  const [users, setUsers] = useState();


  useEffect(function getUserOnMount() {
    async function showUser() {
      setUsers(null);
      const users = await LaoWaiApi.getUser(username);
      setUsers(users);
    }
    showUser();
  }, [username]);


  if (!users) return <h4>Sorry, no result found.</h4>

 
  const friends = users.map(u => (u.friendusername));
  const friendrequests = users.map(u => (u.senderusername));


  return (
    <div className="UserPage col-md-8 offset-md-2">
      {users.length
      ? (
        <div>
          <UserProfile user={users[0]} />
          <PrivateNavigation username={username}/>
          {currentUser.username === username 
            ? null : (
              <div>
                {friends.includes(currentUser.username) 
                ? <UnfriendButton /> : (
                  <div>
                    {!friendrequests.includes(currentUser.username) ? <FriendRequest /> : <p>*Friend request pending approval.</p>}
                  </div>
                )}
              </div>
            )
          } 
        </div> 
        ) : (
          <p>Sorry, no result found.</p>
      )} 
    </div>
  );
}


export default UserPage;
