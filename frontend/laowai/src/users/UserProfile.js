import React from "react";

function UserProfile({user}) {

    console.debug("UserProfile");

    return (
        <div className="UserProfile col-md-8 offset-md-2">
          <h4>{user.username}</h4>
          <h4>{user.headerimageurl}</h4>
          <h4>Affiliation: {user.college}</h4>
          <h4>Proficiency of Chinese: {user.proficiencyofchinese}</h4>
          {user.hometown? <h4>From: {user.hometown}</h4> : null}
          {user.currentcity? <h4>Currently live at: {user.currentcity}</h4> : null}
          <h4>Member since: {user.since}</h4>
        </div>
    );
}
  
export default UserProfile;