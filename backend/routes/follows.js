"use strict";

/** Routes for user's follows. */

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const Follow = require("../models/follow");
const Follower = require("../models/follower");

const router = express.Router();


/** GET /[username]/follows/
 * 
 *  Returns list of all follows: { follows: [ {id, follow_username, since, header_image_url}, ... ] }
 *
 * Authorization required: admin or same-user-as-:username
 * 
 **/

router.get("/:username/follows", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const follows = await Follow.getAll(req.params.username);
      return res.json({ follows });
    } catch (err) {
      return next(err);
    }
  });


/** GET /[username]/follows/[id] => { follow }
 *
 * Returns { id, followed_username, following_username, since }
 *   
 * Authorization required: admin or same user-as-:username
 **/

router.get("/:username/follows/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const follow = await Follow.get(req.params.id);
      return res.json({ follow });
    } catch (err) {
      return next(err);
    }
  });
  

  /** post /[username]/follow
 *
 * Returns {follow: {id, username, followed_username, following_username, since}}
 *
 * Authorization required: logged in user
 * */

router.post("/:username/follow", ensureLoggedIn, async function (req, res, next) {
  try {
    const follow = await Follow.follow(res.locals.user.username, req.params.username);
    const follower = await Follower.add(req.params.username, res.locals.user.username)
    return res.status(201).json({follow, follower})
  } catch (err) {
    return next(err);
  }
});
  

/** DELETE /[username]/unfollow  =>  { deleted: follow }
 *
 * Authorization required: logged in user
 **/

router.delete("/:username/unfollow", ensureLoggedIn, async function (req, res, next) {
    try {
      await Follow.unfollowByName(res.locals.user.username, req.params.username);
      await Follower.remove(req.params.username, res.locals.user.username)
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  });


/** DELETE /[username]/follows/[id]/unfollow  =>  { deleted: follow }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username/follows/:id/unfollow", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await Follow.unfollowById(req.params.id);
    await Follower.remove(req.params.username, res.locals.user.username)
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
  