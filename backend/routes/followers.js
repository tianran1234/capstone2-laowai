"use strict";

/** Routes for user's follows. */

const express = require("express");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Follower = require("../models/follower");

// const router = express.Router();
const router = require('express-promise-router')();


/** GET /[username]/followers/
 * 
 *  Returns list of all followers: { followers: [ {id, follower_username, since}, ... ] }
 *
 * Authorization required: admin or same-user-as-:username
 * 
 **/

router.get("/:username/followers", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const followers = await Follower.getAll(req.params.username);
      return res.json({ followers });
    } catch (err) {
      return next(err);
    }
  });


/** GET /[username]/followers/[id] => { follower }
 *
 * Returns { id, follower_username, username, since }
 *   
 * Authorization required: admin or same-user-as-:username
 **/

router.get("/:username/followers/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const follower = await Follower.get(req.params.id);
      return res.json({ follower });
    } catch (err) {
      return next(err);
    }
  });

  module.exports = router;


  



  