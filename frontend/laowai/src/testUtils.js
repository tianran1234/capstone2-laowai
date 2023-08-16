import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  image_url: null,
};

const UserProvider =
    ({ children, currentUser = demoUser }) => (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };
