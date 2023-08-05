"use strict";

/** Routes for user's announcement requests. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const AnnouncementRequest = require("../models/announcementRequest");
const announcementRequestSchema = require("../schemas/announcementRequest.json");

const router = express.Router();


/** GET /
 * 
 *  Returns list of all announcement requests: { requests: [ {id, sender_username, title, sent_at}, ... ] }
 *
 *  Authorization required: admin
 * 
 **/

router.get("/", ensureAdmin, async function (req, res, next) {
    try {
      const requests = await AnnouncementRequest.getAll();
      return res.json({ requests });
    } catch (err) {
      return next(err);
    }
  });


/** POST /
 *
 * Returns {request: {id, sender_username, title, body, pic, sent_at}}
 *
 * Authorization required: admin or same-user-as-:username
 * */

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, announcementRequestSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const request = await AnnouncementRequest.create(res.locals.user.username, req.body);
    return res.status(201).json({request})
    } catch (err) {
      return next(err);
    }
});


/** GET /[id]
 *
 * Returns data of an announcement request { id, sender_username, title, body, pic, sent_at}
 * 
 * Authorization required: admin
 **/

router.get("/:id", ensureAdmin, async function (req, res, next) {
  try {
    const announcement = await AnnouncementRequest.get(req.params.id);
    return res.json({ announcement });
  } catch (err) {
    return next(err);
  }
});

/** POST /[id]/accept
 *
 * Returns data of a new announcement{ id, username, title, body, pic, posted_at}
 * 
 * Add that announcement into announcement db
 * 
 * Authorization required: admin
 **/

router.post("/:id/accept", ensureAdmin, async function (req, res, next) {
    try {
      const announcement = await AnnouncementRequest.accept(req.params.id);
      return res.json({ announcement });
    } catch (err) {
      return next(err);
    }
  });
  

/** DELETE /[id]/decline  =>  { declined: id }
 *
 * Authorization required: admin
 **/

router.delete("/:id/decline", ensureAdmin, async function (req, res, next) {
    try {
      await AnnouncementRequest.decline(req.params.id);
      return res.status(200).json({ message: 'Announcement request declined.' });
    } catch (err) {
      return next(err);
    }
  });

  
  
module.exports = router;
  