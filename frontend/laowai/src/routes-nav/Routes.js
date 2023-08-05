import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import AnnouncementList from "../announcements/AnnouncementList";
import AnnouncementDetail from "../announcements/AnnouncementDetail";
import Forum from "../forum/Forum";
import ForumDetail from "../forum/ForumDetail";
import NewQuestionForm from "../questions/NewQuestionForm";
import NewAnswerForm from "../answers/NewAnswerForm";
import FriendList from "../friends/FriendList";
import FriendRequestList from "../friends/FriendRequestList";
import FriendRequest from "../friends/FriendRequest";
import PostList from "../posts/PostList";
import PostDetail from "../posts/PostDetail";
import NewPostForm from "../posts/NewPostForm";
import AnnouncementRequestForm from "../announcements/AnnouncementRequestForm";
import UserPage from "../users/UserPage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";


/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
  console.debug(
      "GenRoutes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );


  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/auth/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/auth/signup">
            <SignupForm signup={signup} />
          </Route>

          <Route exact path="/announcements">
            <AnnouncementList />
          </Route>

          <Route exact path="/announcements/:id">
            <AnnouncementDetail />
          </Route>

          <Route exact path="/forum">
            <Forum />
          </Route>

          <Route exact path="/forum/:id">
            <ForumDetail />
          </Route>

          <PrivateRoute exact path="/forum/questions/new">
            <NewQuestionForm />
          </PrivateRoute>

          <PrivateRoute exact path="/forum/:id/answers/new">
            <NewAnswerForm />
          </PrivateRoute>

          <PrivateRoute exact path="/users/:username">
            <UserPage />
          </PrivateRoute>

          <PrivateRoute exact path="/:username/posts">
            <PostList />
          </PrivateRoute>

          <PrivateRoute exact path="/:username/posts/:id">
            <PostDetail />
          </PrivateRoute>

          <PrivateRoute exact path="/:username/new_post">
            <NewPostForm />
          </PrivateRoute>

          <PrivateRoute exact path="/:username/friends">
            <FriendList />
          </PrivateRoute>

          <PrivateRoute exact path="/:username/friend_requests">
            <FriendRequestList />
          </PrivateRoute>

          <PrivateRoute exact path="/:username/friend_requests/new">
            <FriendRequest />
          </PrivateRoute>

          <PrivateRoute exact path="/announcement_requests/new">
            <AnnouncementRequestForm />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
