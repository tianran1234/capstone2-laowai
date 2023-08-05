import React from "react";
import { Link } from "react-router-dom";
import "./AnnouncementRequest.css";


/** Direct user to announcement request form
 *
 * AnnouncementList -> AnnouncementRequest
 */

function AnnouncementRequest() {
  console.debug("AnnouncementRequest");


  return (
    <div className="AnnouncementList-Request">
          <Link to={"/announcement_requests/new"}>
            <button id="announ-btn">
            Request to make an announcement
            </button>
          </Link>
    </div>
  );
}


export default AnnouncementRequest;
