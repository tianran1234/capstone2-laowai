import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LaoWaiApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import "./AnnouncementDetail.css";

/** Announcement Detail page.
 *
 * Renders detailed information about an announcement.
 *
 * Routed at /announcements/[id]
 *
 * Routes -> AnnouncementDetail 
 */

function AnnouncementDetail() {
  const { id } = useParams();
  console.debug("AnnouncementDetail", "id=", id);

  const [announcement, setAnnouncement] = useState(null);

  useEffect(function getAnnouncementOnMount() {
    async function getAnnouncement() {
      const announcement = await LaoWaiApi.getAnnouncement(id);
      setAnnouncement(announcement);
    }
    getAnnouncement();
  }, [id]);


  if (!announcement) return <LoadingSpinner />;

  return (
    <div>
      <div className="AnnouncementDetail col-md-8 offset-md-2">
        <div class="title">
          <h4>{announcement.title}</h4>
        </div>
        <h6>by {announcement.username} at {announcement.postedat}</h6>
        <div class="body">
          <p>{announcement.body}</p>
          <p>{announcement.pic}</p>
        </div>
        
      </div>
      <Link to={`/announcements`}><button>Go back</button></Link>
    </div>
  );
}


export default AnnouncementDetail;
