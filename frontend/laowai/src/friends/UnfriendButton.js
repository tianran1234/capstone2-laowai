import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import LaoWaiApi from "../api/api";
import UserContext from "../auth/UserContext";

function UnfriendButton() {

  const { currentUser } = useContext(UserContext);

  const user = useParams();

  const username = user.username;

  const [isFriend, setIsFriend] = useState(true);

  async function handleClick() {
    await LaoWaiApi.unfriendByName(currentUser.username, username);
    setIsFriend(false);
  }


  return (
      <div className="unfriendButton col-md-8 offset-md-2">
        {isFriend ? <button onClick={handleClick}>Unfriend</button> : <p> You are no longer friends with {username}.</p> }
      </div>
  );
}
  
export default UnfriendButton;