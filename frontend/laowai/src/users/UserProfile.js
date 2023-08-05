import React from "react";

function UserProfile({user}) {

    console.debug("UserProfile");

    return (
        <div className="UserProfile col-md-8 offset-md-2">
          <h3>{user.username}</h3>
          <div className="profile-image">
            {user.headerimageurl}
          </div>
          <h6>Affiliation: {user.college}</h6>
          <h6>Proficiency of Chinese: {user.proficiencyofchinese}</h6>
          {user.hometown? <h6>From: {user.hometown}</h6> : null}
          {user.currentcity? <h6>Currently live at: {user.currentcity}</h6> : null}
          <h6>Member since: {user.since}</h6>
        </div>
    );
}
  
export default UserProfile;