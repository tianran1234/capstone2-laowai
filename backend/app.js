"use strict";

/** Express app for Laowai. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const announcementRoutes = require("./routes/announcements");
const announcementRequestRoutes = require("./routes/announcementRequests");
const forumRoutes = require("./routes/forum");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const friendRoutes = require("./routes/friends");
const friendRequestRoutes = require("./routes/friendRequests");
const followRoutes = require("./routes/follows");
const followerRoutes = require("./routes/followers");
const likeRoutes = require("./routes/likes");
const answerRoutes = require("./routes/answers");


const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/announcements", announcementRoutes);
app.use("/announcement_requests", announcementRequestRoutes);
app.use("/forum", forumRoutes);
app.use("/", userRoutes);
app.use("/", followerRoutes);
app.use("/", followRoutes);
app.use("/", postRoutes);
app.use("/", friendRoutes);
app.use("/", friendRequestRoutes);
app.use("/", likeRoutes);
app.use("/", answerRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});


module.exports = app;
