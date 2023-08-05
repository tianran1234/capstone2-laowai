import React from "react";
import { Link } from "react-router-dom";


/** Show limited information about an announcement
 *
 * Is rendered by AnnouncementList to show a "card" for each announcement.
 *
 * announcementList -> announcementCard
 */

function AnnouncementCard({ id, username, title, postedat }) {
  console.debug("announcementCard", id);

  return (
      <Link className="AnnouncementCard card" to={`/announcements/${id}`}>
        <div className="card-body">
          <h4 className="card-title">
            {title}
          </h4>
          <p>by {username} at {postedat}</p>
        </div>
      </Link>
  );
}


export default AnnouncementCard;
