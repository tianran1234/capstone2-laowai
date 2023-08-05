import React, { useState }from "react";
import { Link, useParams } from "react-router-dom";
import LaoWaiApi from "../api/api";


/** Show limited information about a friend
 *
 * Is rendered by FriendList to show a "card" for each friend.
 *
 * FriendList -> FriendCard
 */

function FriendCard({ id, friend_username, header_image_url, since }) {
  console.debug("FriendCard");

  const { username } = useParams();

  const [isFriend, setIsFriend] = useState(true);

  async function handleUnfriend() {
    await LaoWaiApi.unfriendById(username, id);
    setIsFriend(false);
  };


  return (
    <div>
      {isFriend
        ? (
          <div>
            <Link className="FriendCard card" to={`/${friend_username}`}>
              <div className="card-body">
                <h6 className="card-title">
                  {friend_username}
                </h6>
                <img src={header_image_url}
                    alt={friend_username}
                    className="float-right ml-5" />
                <p><small>{since}</small></p>
              </div>
            </Link>
            <button onClick={handleUnfriend}>Unfriend</button>
        </div>
        ) : <p> You are no longer friends with {friend_username}.</p>
      }
    </div>
  );
}

export default FriendCard;
