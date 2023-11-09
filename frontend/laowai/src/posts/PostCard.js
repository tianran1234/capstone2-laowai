import React from "react";
import { Link } from "react-router-dom";


/** Show limited information about a post.
 *
 * Is rendered by PostList to show a "card" for each post.
 *
 * PostList -> PostCard
 */

function PostCard({ id, username, body, postdate }) {
  console.debug("PostCard", id);


  return (
      <Link className="PostCard card" to={`/${username}/posts/${id}`}>
        <div className="card-body">
          <h6 className="card-body">
            {body}
          </h6>
          <p>Posted by {username} at: {postdate}</p>
        </div>
      </Link>
  );
}


export default PostCard;
