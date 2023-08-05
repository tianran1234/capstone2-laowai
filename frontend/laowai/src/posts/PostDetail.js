import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import LikeList from "../likes/LikeList";
import LikeButton from "../likes/LikeButton";
import UserContext from "../auth/UserContext";
import LaoWaiApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";


/** Show detailed information about a post
 *
 * Is rendered by postList to show details for each post.
 *
 * PostList -> PostDetail
 */

function PostDetail() {
  console.debug("PostDetail");

  const { username, id } = useParams();

  const [post, setPost] = useState(null);

  const { currentUser } = useContext(UserContext);

  const [like, setLike] = useState(null);

  const history = useHistory();

  
  useEffect(function getPostOnMount() {
    async function getPost() {
      const post = await LaoWaiApi.getPost(username, id);
      setPost(post);
    }
    getPost();
  }, [username, id]);

  if (!post) return <LoadingSpinner />;

 
  async function handleDelete () {
    await LaoWaiApi.deletePost(username, id);
    history.push(`/${username}/posts`);
  };
  
  const likedby = post.map(p => (p.likedby));


  async function addLike() {
    await LaoWaiApi.like(id, currentUser.username);
    setLike(currentUser.username);
  }

  async function removeLike() {
    await LaoWaiApi.unlike(id, currentUser.username);
    setLike(null);
  }


  return (
    <div>
      <div className="post-detail card" >
        <div className="card-body">
          <h6 className="card-title">
            Posted by {post[0].username} at: {post[0].postedat}
          </h6>
          <h4>{post[0].body}</h4>
          {likedby[0] ? <p>♥ by <LikeList likedby={likedby} like={like}/></p> : null}
          <img src={post[0].pic}
               alt="post"
               className="float-right ml-5" />
        </div>
      {currentUser.username === username? <button onClick={handleDelete}>Delete</button> : null}
      <LikeButton likes={likedby} removeLike={removeLike} addLike={addLike}/>
      <Link to={`/${username}/posts`}><button>Go back</button></Link>
    </div>
  </div>
  );
}

export default PostDetail;
