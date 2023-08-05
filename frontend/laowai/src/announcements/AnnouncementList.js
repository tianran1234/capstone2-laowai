import React, { useState, useEffect } from "react";
import LaoWaiApi from "../api/api";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementRequest from "./AnnouncementRequest";

/** Show page with list of announcements.
 *
 * On mount, loads announcements from API.
 *
 * This is routed to at /announcements
 *
 * Routes -> { AnnouncementCard }
 */

function AnnouncementList() {
  console.debug("AnnouncementList");

  const [announcements, setAnnouncements] = useState(null);

  useEffect(function getAnnouncementsOnMount() {
    console.debug("AnnouncementList useEffect getAnnouncementsOnMount");
    showAnnouncements();
  }, []);

  async function showAnnouncements() {
    let announcements = await LaoWaiApi.getAnnouncements();
    setAnnouncements(announcements);
  }
  
  if (!announcements) return <h4>No announcement has been made.</h4>

  return (
      <div className="AnnouncementList col-md-8 offset-md-2">
        <AnnouncementRequest />
        {announcements.length
          ? (
              <div className="AnnouncementList-list">
                {announcements.map(a => (
                    <AnnouncementCard
                        id={a.id}
                        title={a.title}
                        username={a.username}
                        postedat={a.postedat}
                    />
                ))}
              </div>
          ) : (
              <p className="lead">No announcement has been made.</p>
          )}
      </div>
  );
}



export default AnnouncementList;