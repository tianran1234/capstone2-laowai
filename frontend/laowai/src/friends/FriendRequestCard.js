import React, {useContext, useState}from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import LaoWaiApi from "../api/api";

/** Show information about a friend request
 *
 * Is rendered by FriendRequestList to show a "card" for each friend request.
 *
 * FriendRequestList -> FriendRequestCard
 */

function FriendRequestCard({id, senderusername, sentat}) {
  console.debug("FriendRequestCard");

  const { currentUser } = useContext(UserContext);

  const [accepted, setAccepted] = useState(false);

  const [declined, setDeclined] = useState(false);

  const [handled, setHandled] = useState(false);

  async function handleAccept(evt) {
    await LaoWaiApi.acceptFriend(id, currentUser.username);
    setHandled(true);
    setAccepted(true);
  }

  async function handleDecline(evt) {
    await LaoWaiApi.declineFriend(currentUser.username, id);
    setHandled(true);
    setDeclined(true);
  }


  return (
    <div>
      {!handled
        ? (
        <div className="FriendRequestCard card">
          <div className="card-body">
            <h6 className="card-title">
              <Link to={`/${senderusername}`}>{senderusername}</Link>
            </h6>
            <p><small>Sent at: {sentat}</small></p>
            <button onClick={handleAccept}>Accept</button> 
            <button onClick={handleDecline}>Decline</button>
          </div>
        </div>
        ) : (
        <div>
          {accepted ? <p>You are now friends with {senderusername}.</p> : null}
          {declined ? <p>You have declined the friend request from {senderusername}.</p> : null}
        </div>
        )
      }
    </div>
  );
}

export default FriendRequestCard;
