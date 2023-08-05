import React from "react";


/** Show detailed information about a post
 *
 * Is rendered by postList to show details for each post.
 *
 * PostList -> PostDetail
 */

function LikeList({likedby, like}) {
  console.debug("LikeList");

  console.log(like);


  return (
    <div>
      {likedby
        ? (
            <div className="LikeList-list">
              {likedby.map(l => (
                    <p><small>{l}</small></p>
                  ))
              }
            </div>
        ) : null
      }
      {like && !likedby.includes(like)? <p><small>{like}</small></p> : null}
    </div>
  );
}


export default LikeList;
