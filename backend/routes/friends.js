"use strict";

/** Routes for user's friends. */

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const Friend = require("../models/friend");

const router = express.Router();


/** GET /[username]/friends/
 * 
 *  Returns list of all friends: { friends: [ {id, friend_username, since, header_image_url}, ... ] }
 *
 * Authorization required: admin or same-user-as-:username
 * 
 **/

router.get("/:username/friends", ensureLoggedIn, async function (req, res, next) {
    try {
      const friends = await Friend.getAll(req.params.username);
      return res.json({ friends });
    } catch (err) {
      return next(err);
    }
  });



/** GET /[username]/friends/[id] => { friend }
 *
 * Returns { friend_id, username, image_url, header_image_url, college, proficiency_of_Chinese, current_city, hometown }
 *   
 * Authorization required: admin or same user-as-:username
 **/

router.get("/:username/friends/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const friend = await Friend.get(req.params.id);
      return res.json({ friend });
    } catch (err) {
      return next(err);
    }
  });
  

/** DELETE /[username]/friends/[id]  =>  { deleted: friend }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username/friends/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      await Friend.unfriendById(req.params.id);
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  });

  
/** DELETE /[username]/unfriend =>  { deleted: friend }
 *
 * Authorization required: admin or logged in user
 **/

router.delete("/:username/unfriend", ensureLoggedIn, async function (req, res, next) {
  try {
    await Friend.unfriendByName(res.locals.user.username, req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;