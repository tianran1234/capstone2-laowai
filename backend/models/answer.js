"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");

class Answer {
/** Get all answers.
     *
     * Returns [{ id, username, body, posted_at}, ...]
     * */

static async getAll(id) {
  const result = await db.query(
    `SELECT id,
            body,
            posted_at AS postedAt,
            username 
    FROM answers
    WHERE question_id = $1
    ORDER BY postedAt`,
          [id]);

    const answers = result.rows;

    if (!answers) throw new NotFoundError(`No answers posted yet.`);

    return answers;
}

  /** Create an answer (from data), update db, return new answer data.
   *
   * data should be { username, question_id, body }
   *
   * Returns { id, question_id, username, body, posted_at }
   **/


  static async create(username, question_id, data) {
    const preCheck = await db.query(
          `SELECT id
          FROM questions
          WHERE id = $1`, [question_id]);

    const question = preCheck.rows[0];

    if (!question) throw new NotFoundError(`No Question: ${question_id}`);

    const result = await db.query(
          `INSERT INTO answers (
                                username, 
                                question_id,
                                body,
                                posted_at)
          VALUES ($1, $2, $3, current_timestamp)
          RETURNING id, question_id AS questionId, username, body, posted_at AS postedAt`,
        [username, question_id, data.body]);

    let answer = result.rows[0];

    return answer;

    }


  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM answers
           WHERE id = $1
           RETURNING id`, [id]);
    const answer = result.rows[0];

    if (!answer) throw new NotFoundError(`No Answer: ${id}`);
  }
}


module.exports = Answer;

