"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");


/** Related functions for questions. */

class Question {
  /** Create a question (from data), update db, return new question data.
   *
   * data should be { username, title, body }
   *
   * Returns { id, username, title, body, posted_at }
   **/

  static async create(username, data) {
    const result = await db.query (
          `INSERT INTO questions (
                                  username,
                                  title,             
                                  body,
                                  posted_at 
                                  )
           VALUES ($1, $2, $3, current_timestamp)
           RETURNING id, username, title, body, posted_at AS postedAt`,
        [
          username,
          data.title,
          data.body
        ]);

    let question = result.rows[0];

    return question;
  }


  /** Find all questions.
   *
   * Returns [{ id, username, title, body, posted_at}, ...]
   * */

  static async getAll() {
    const result = await db.query(
                    `SELECT id,
                            title,
                            username,
                            posted_at AS postedAt
                 FROM questions 
                 ORDER BY postedAt DESC`
    );

    const questions = result.rows;

    if (!questions) throw new NotFoundError(`No questions posted yet.`);

    return questions;
  }


  /** Given a question id, return data about question.
   *
   * Returns { id, username, title, body, posted_at}
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const result = await db.query(
      `SELECT id,
              username,
              title,
              body,
              posted_at AS PostedAt
       FROM questions 
       WHERE id = $1`, [id]);

    const question = result.rows[0];

    if (!question) throw new NotFoundError(`No Question Found: ${id}`);

    return question;
  }


  /** Delete given question from database; returns undefined.
   *
   * Throws NotFoundError if question not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM questions
           WHERE id = $1
           RETURNING id`, [id]);
    const question = result.rows[0];

    if (!question) throw new NotFoundError(`No Question Found: ${id}`);
  }
}


module.exports = Question;
