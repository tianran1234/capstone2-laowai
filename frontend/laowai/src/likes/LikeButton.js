import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";

function LikeButton({likes, removeLike, addLike}) {

  const { currentUser } = useContext(UserContext);

  const [like, setLike] = useState(likes.includes(currentUser.username));

  async function handleClick () {
    if (like) {
      await removeLike(); 
      setLike(false);
    } else {
      await addLike();
      setLike(true);
    }
  };

  console.log(like);


  return (
      <div className="LikeButton col-md-8 offset-md-2">
        <button onClick={handleClick}>{like? "Unlike" : "Like"}</button> 
      </div>
  );
}
  
export default LikeButton;