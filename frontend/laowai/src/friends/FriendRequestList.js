import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LaoWaiApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import FriendRequestCard from "./FriendRequestCard";

/** Show page with list of friend requests.
 *
 * On mount, loads requests from API.
 *
 * This is routed to at /:username/friends/requests
 *
 * Routes -> { FriendRequestList }
 */

function FriendRequestList() {
  console.debug("FriendRequestList");

  const { username } = useParams();

  const { currentUser } = useContext(UserContext);

  const [requests, setRequests] = useState(null);

  useEffect(function getRequestsOnMount() {
    console.debug("RequestList useEffect getRequestsOnMount");
    async function showRequests() {
      let requests = await LaoWaiApi.getFriendRequests(username);
      setRequests(requests);
    };
    showRequests();
  }, [username]);

  if (currentUser.username !== username) return (
    <div>
      <h4>Sorry, you are not the authorized to access this.</h4>
      <Link to={`/users/${username}`}><button>Go back</button></Link>
    </div>
  )
 
  if (!requests) return LoadingSpinner;

  return (
    <div className="FriendRequestList col-md-8 offset-md-2">
      {requests.length
        ? (
          <div className="FriendRequestList-list">
            {requests.map(r => (
                <FriendRequestCard
                    id={r.id}
                    senderusername={r.senderusername}
                    sentat={r.sentat}
                />
            ))}
          </div>
        ) : (
          <h4 className="lead">No new friend request.</h4>
        )
      }
      <Link to={`/users/${username}`}><button>Go back</button></Link>
    </div>
  );
}



export default FriendRequestList;