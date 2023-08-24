import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LaoWaiApi from "../api/api";
import PostCard from "./PostCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

/** Show page with list of posts of a user.
 *
 * On mount, loads posts from API.
 *
 * This is routed to at /[username]/posts
 *
 * Routes -> { PostDetail }
 */

function PostList() {
  console.debug("PostList");

  const { username } = useParams();

  const { currentUser } = useContext(UserContext);

  const [posts, setPosts] = useState(null);

  useEffect(function getPostsOnMount() {
    console.debug("PostList useEffect getPostsOnMount");
    async function showPosts() {
      let posts = await LaoWaiApi.getPosts(username);
      setPosts(posts);
    }
    showPosts();
  }, [username]);

  if (currentUser.username !== username && !posts) return (
    <div>
      <h4>The user hasn't posted anything yet.</h4>
      <Link to={`/users/${username}`}><button>Go back</button></Link>
    </div>
  )

  if (!posts) return LoadingSpinner;

  return (
    <div className="PostList col-md-8 offset-md-2">
      {currentUser.username === username
      ? (
        <Link to={`/${username}/new_post`}><button>Make a post</button></Link>
      ) : null }
      {posts.length
        ? (
            <div className="PostList-list">
              {posts.map(p => (
                    <PostCard
                        username={p.username}
                        id={p.id}
                        body={p.body}
                        pic={p.pic}
                        postedat={p.postedat}
                    />
              ))}
            </div>
        ) : (
          <p className="lead">No post created yet.</p>
        )
      }
      <Link to={`/users/${username}`}><button>Go back</button></Link>
    </div>
  );
}

export default PostList;
