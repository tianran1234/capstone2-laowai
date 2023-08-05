"use strict";

/** Routes for likes. */

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const Like = require("../models/like");

const router = express.Router();

/** GET /[username]/posts/[id]/likes
 * 
 *  Returns list of all likes: {likes: [ {username}, ... ] }
 *
 * Authorization required: none
 * 
 **/

router.get("/:username/posts/:id/likes", ensureLoggedIn, async function (req, res, next) {
  try {
    const likes = await Like.getAll(req.params.id);
    return res.json({ likes });
  } catch (err) {
    return next(err);
  }
});

/** POST /:username/posts/:id/like 
 *
 * Returns {like: {id, post_id, username}}
 *
 * Authorization required: admin or logged in user
 * */

router.post("/:username/posts/:id/like", ensureLoggedIn, async function (req, res, next) {
    try {
      const like = await Like.like(req.params.id, res.locals.user.username);
      return res.status(201).json({like})
      } catch (err) {
        return next(err);
    }
  });



/** DELETE /[id]  =>  { deleted: like }
 *
 * Authorization required: admin or logged in user
 **/

router.delete("/:username/posts/:id/unlike", ensureLoggedIn, async function (req, res, next) {
  try {
    const unlike = await Like.unlike(req.params.id, res.locals.user.username);
    return res.json({ unlike });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
  


