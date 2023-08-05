"use strict";

/** Routes for Q&A forum. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Question = require("../models/question");
const questionNewSchema = require("../schemas/questionNew.json");

const router = express.Router();


/** GET /
 * 
 *  Returns list of all questions: { questions: [ {id, username, title, body, posted_at }, ... ] }
 *
 *  Authorization required: none
 * 
 **/

router.get("/", async function (req, res, next) {
    try {
      const questions = await Question.getAll();
      return res.json({ questions });
    } catch (err) {
      return next(err);
    }
});


/** POST / 
 *
 * Returns {question: {id, username, title, body, posted_at }}
 *
 * Authorization required: logged in user
 * */

router.post("/questions/new", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, questionNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const question = await Question.create(res.locals.user.username, req.body);
    return res.status(201).json({question})
    } catch (err) {
      return next(err);
    }
});


/** GET/ [id] => { question }
 *
 * Returns { id, username, title, body, posted_at, answers }
 *   
 * Authorization required: none
 **/

router.get("/:id", async function (req, res, next) {
    try {
      const question = await Question.get(req.params.id);
      return res.json({ question });
    } catch (err) {
      return next(err);
    }
});
  

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      await Question.remove(req.params.id);
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
});



module.exports = router;

  