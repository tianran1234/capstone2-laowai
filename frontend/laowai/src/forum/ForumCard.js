import React from "react";
import { Link } from "react-router-dom";


/** Show limited information about a question
 *
 * Is rendered by ForumList to show a "card" for each question.
 *
 * ForumList -> ForumCard
 */

function ForumCard({ id, title, username, postedat }) {
  console.debug("ForumCard");

  return (
      <Link className="ForumCard card" to={`/forum/${id}`}>
        <div className="card-body">
          <h4 className="card-title">
            {title}
          </h4>
          <p>by {username} posted at: {postedat}</p>
        </div>
      </Link>
  );
}

export default ForumCard;
