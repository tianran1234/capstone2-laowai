"use strict";

/** Routes for announcements. */

const express = require("express");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Announcement = require("../models/announcement");

const router = express.Router();


/** GET /
 * 
 *  Returns list of all announcements: { announcements: [ {id, username, title, posted_at}, ... ] }
 *
 *  Authorization required: none
 * 
 **/

router.get("/", async function (req, res, next) {
  try {
    const announcements = await Announcement.getAll();
    return res.json({ announcements });
  } catch (err) {
    return next(err);
    }
});



/** GET /[id] => { announcement }
 *
 * Returns { id, username, title, body, pic, posted_at }
 *   
 * Authorization required: none
 **/

router.get("/:id", async function (req, res, next) {
    try {
      const announcement = await Announcement.get(req.params.id);
      return res.json({ announcement });
    } catch (err) {
      return next(err);
    }
});
  

/** DELETE /[id]  =>  { deleted: announcement }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      await Announcement.remove(req.params.id, res.locals.user.username);
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
});

  

module.exports = router;
  