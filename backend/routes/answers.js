"use strict";

/** Routes for answers. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Answer = require("../models/answer");
const answerNewSchema = require("../schemas/answerNew.json");

const router = express.Router();

/** GET /forum/[id]/answers
 * 
 *  Returns list of all answers: { answers: [ {id, username, body, posted_at }, ... ] }
 *
 * Authorization required: none
 * 
 **/

router.get("/forum/:id/answers", async function (req, res, next) {
  const id = req.params.id;
  try {
    const answers = await Answer.getAll(id);
    return res.json({ answers });
  } catch (err) {
    return next(err);
  }
});

/** POST /forum/:id/answers  
 *
 * Returns {answer: {id, question_id, username, body, posted_at }}
 *
 * Authorization required: admin or logged in user
 * */

router.post("/forum/:id/answers", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, answerNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
  
    const answer = await Answer.create(res.locals.user.username, req.params.id, req.body);
    return res.status(201).json({answer})
    } catch (err) {
      return next(err);
    }
  });


/** DELETE /[id]  =>  { deleted: answer }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/forum/:id/answers/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await Answer.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
  


