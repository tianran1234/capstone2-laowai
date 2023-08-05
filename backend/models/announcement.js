"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for announcements. */

class Announcement {

  /** Create a announcement (from data) will need to be approved by Admin first, 
   *  so that method is included in the AnnouncementRequest Model.
   * */
  

  /** Find all announcements.
   *
   * Returns [{ id, title, username, posted_at }, ...]
   * */

  static async getAll() {
    const result = await db.query(
                `SELECT id,
                        title,
                        username,
                        posted_at AS postedAt
                 FROM announcements
                 ORDER BY postedAt DESC`
    );

    const announcements = result.rows;

    if (!announcements) throw new NotFoundError(`No Announcements posted yet.`);

    return announcements;
  }


  /** Given an announcement id, return data about announcement.
   *
   * Returns { id, title, username, body, pic, posted_at }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const result = await db.query(
          `SELECT id,
                  title,
                  username,
                  body,
                  pic,
                  posted_at AS postedAt
           FROM announcements
           WHERE id = $1`,
        [id]);

    const announcement = result.rows[0];

    if (!announcement) throw new NotFoundError(`Can't Find Announcement: ${id}`);

    return announcement;
  }


  /** Update announcement data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {body, pic}
   *
   * Returns {id, title, username, body, pic, posted_at}
   *
   * Throws NotFoundError if not found.
   */

  static async update(body, pic) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          body: body,
          pic: pic
        });
    const titleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE announcements 
                      SET ${setCols} 
                      WHERE title = ${titleVarIdx} 
                      RETURNING id
                                title, 
                                username,
                                body, 
                                pic,
                                posted_at AS postedAt`;
    const result = await db.query(querySql, [...values, title]);
    const announcement = result.rows[0];

    if (!announcement) throw new NotFoundError(`No announcement: ${title}`);

    return announcement;
  }


  /** Delete given announcement from database; returns undefined.
   *
   * Throws NotFoundError if announcement not found.
   **/

  static async remove(id, username) {
    const result = await db.query(
          `DELETE
           FROM announcements
           WHERE id = $1 AND username =$2
           RETURNING id`,
        [id, username]);
    const announcement = result.rows[0];

    if (!announcement) throw new NotFoundError(`Can't Find Announcement: ${id}`);
  }
}



module.exports = Announcement;
