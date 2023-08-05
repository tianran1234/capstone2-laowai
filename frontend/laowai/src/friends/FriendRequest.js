import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import LaoWaiApi from "../api/api";
import UserContext from "../auth/UserContext";

function FriendRequest() {

  const { currentUser } = useContext(UserContext);

  const username = useParams();

  const [sent, setSent] = useState();

  async function handleClick() {
    await LaoWaiApi.createFriendRequest(username, currentUser.username);
    setSent(true);
  };

  return (
      <div className="FriendRequest col-md-8 offset-md-2">
        {!sent ? <button onClick={handleClick}>Send friend request</button> : <p>Friend request successfully sent!</p> }
      </div>
  );
}
  
export default FriendRequest;