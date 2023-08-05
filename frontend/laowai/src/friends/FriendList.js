import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LaoWaiApi from "../api/api";
import FriendCard from "./FriendCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

/** Show page with list of friends of a user.
 *
 * On mount, loads friends from API.
 *
 * This is routed to at /:username/friends
 *
 * Routes -> { FriendCard, SearchForm }
 */

function FriendList() {
  console.debug("FriendList");

  const { username } = useParams();

  const { currentUser } = useContext(UserContext);

  const [friends, setFriends] = useState(null);

  useEffect(function getFriendsOnMount() {
    console.debug("FriendList useEffect getFriendsOnMount");
    async function showList() {
      let friends = await LaoWaiApi.getFriends(username);
      setFriends(friends);
    };
    showList();
  }, [username]);

  if (currentUser.username !== username) return (
    <div>
      <h4>Sorry, you are not the authorized to access this.</h4>
      <Link to={`/users/${username}`}><button>Go back</button></Link>
    </div>
  )

  if (!friends) return LoadingSpinner;


  return (
    <div className="FriendList col-md-8 offset-md-2">
      {friends.length
        ? (
          <div className="FriendList-list">
            {friends.map(f => (
              <FriendCard
                  id={f.id}
                  friend_username={f.friendusername}
                  header_image_url={f.headerimageurl}
                  since={f.since}
              />
            ))}
          </div>
        ) : (
          <p className="lead">Sorry, you haven't added any friends yet!</p>
        )
      }
      <Link to={`/${username}`}><button>Go back</button></Link>
    </div>
  );
}

export default FriendList;
