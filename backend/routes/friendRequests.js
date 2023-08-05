"use strict";

/** Routes for user's friend requests. */

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const FriendRequest = require("../models/friendRequest");

const router = express.Router();


/** GET /[username]/friend_requests
 * 
 *  Returns list of all friend requests: { requests: [ {id, sender_username, body, sent_at}, ... ] }
 *
 *  Authorization required: admin or same-user-as-:username
 * 
 **/

router.get("/:username/friend_requests", ensureLoggedIn, async function (req, res, next) {
    try {
      const requests = await FriendRequest.getAll(req.params.username);
      return res.json({ requests });
    } catch (err) {
      return next(err);
    }
  });


/** POST friend /[username]/friend_requests/new  
 *
 * Returns {request: {id, sender_username, receiver_username, body, sent_at}}
 *
 * Authorization required: logged in user
 * */

router.post("/:username/friend_requests/new", ensureLoggedIn, async function (req, res, next) {
    try {
      const request = await FriendRequest.create(res.locals.user.username, req.params.username);
      return res.status(201).json({request})
    } catch (err) {
      return next(err);
    }
});

/** POST /[username]/friend_requests/[id]/accept
 *
 * Returns data of a new friend { id, username, friend_username, since}
 * 
 * Add that friend into friend db
 * 
 * Authorization required: admin or same user-as-:username
 **/

router.post("/:username/friend_requests/:id/accept", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const friends = await FriendRequest.accept(req.params.id, res.locals.user.username);
      return res.json({ friends });
    } catch (err) {
      return next(err);
    }
  });
  

/** DELETE /[username]/friend_requests/[id]/decline  =>  { declined: id }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username/friend_requests/:id/decline", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      await FriendRequest.decline(req.params.id);
      return res.status(200).json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  });

  module.exports = router;
  