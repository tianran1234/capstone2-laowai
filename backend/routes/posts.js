"use strict";

/** Routes for user's posts. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Post = require("../models/post");
const postNewSchema = require("../schemas/postNew.json");

const router = express.Router();


/** GET /[username]/posts/
 * 
 *  Returns list of all posts: { posts: [ {id, username, body, pic, posted_at }, ... ] }
 *
 * Authorization required: admin or same-user-as-:username
 * 
 **/

router.get("/:username/posts", ensureLoggedIn, async function (req, res, next) {
    try {
      const posts = await Post.getAll(req.params.username);
      return res.json({ posts });
    } catch (err) {
      return next(err);
    }
  });


/** POST / 
 *
 * Returns {post: {id, username, body, pic, posted_at }}
 *
 * Authorization required: admin or same-user-as-:username
 * */

router.post("/:username/new_post", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, postNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const post = await Post.create(res.locals.user.username, req.body);
    return res.status(201).json({post})
    } catch (err) {
      return next(err);
    }
});

/** GET /[username]/posts/[id] => { post }
 *
 * Returns { id, username, body, pic, posted_at }
 *   
 * Authorization required: admin or same user-as-:username
 **/

router.get("/:username/posts/:id", ensureLoggedIn, async function (req, res, next) {
    try {
      const post = await Post.get(req.params.id);
      return res.json({ post });
    } catch (err) {
      return next(err);
    }
});
  

/** DELETE /[id]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username/posts/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const post = await Post.remove(req.params.id);
      return res.json({ post });
    } catch (err) {
      return next(err);
    }
});


module.exports = router;
  