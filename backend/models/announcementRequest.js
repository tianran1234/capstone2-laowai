"use strict";

const db = require("../db");

/** Related functions for announcement requests. */

class AnnouncementRequest {
    /** Get all announcement requests.
     *
     * Returns [{ id, sender_username, title, sent_at }, ...]
     **/

    static async getAll() {
        let result = await db.query(
        `SELECT id,
                sender_username AS senderUsername,
                title, 
                sent_at AS sentAt
        FROM announcement_requests
        ORDER BY sentAt DESC`);

        const requests = result.rows;

        if (!requests) throw new NotFoundError(`No new announcement requests.`);

        return requests;
    }


    /** Send an announcement request.
     *
     * request data should be {sender_username, receiver_username, title, body, pic}
     *
     * Returns { id, sender_username, title, body, pic, sent_at }
     *
     * throw an error if announcement already in db.
     * */

    static async create(username, data) {

      const duplicateCheck = await db.query(
          `SELECT title
          FROM announcements
          WHERE title =$1`,
            [data.title],
        );

      if (duplicateCheck.rows[0]) {
          throw new BadRequestError(`Already Exist: ${title}`);
      }

      const result = await db.query(
        `INSERT INTO announcement_requests (
                                      sender_username,  
                                      title,
                                      body,
                                      pic, 
                                      sent_at
                                    )
            VALUES ($1, $2, $3, $4, current_timestamp)
            RETURNING id, sender_username AS senderUsername, title, body, pic, sent_at AS sentAt`,
        [username, data.title, data.body, data.pic]);

      const request = result.rows[0];

      return request;
    
    }

    /** Given an announcement request id, return data about announcement request.
   *
   * Returns { id, title, username, body, pic, sent_at }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const result = await db.query(
          `SELECT id,
                  title,
                  sender_username AS senderUsername,
                  body,
                  pic,
                  sent_at AS sentAt
           FROM announcement_requests
           WHERE id = $1`,
        [id]);

    const request = result.rows[0];

    if (!request) throw new NotFoundError(`No request: ${id}`);

    return request;
  }


    // If accepted, delete the request from database, update announcement db, return new announcement data.
    static async accept(id, sender_username, title, body, pic) {
      await db.query(
        `DELETE
          FROM announcement_requests
          WHERE id = $1
          RETURNING id`, [id]);

      const result = await db.query(
        `INSERT INTO announcements (
                              username,
                              title,
                              body,
                              pic,
                              posted_at
                             )
            VALUES ($1, $2, $3, $4, current_timestamp)
            RETURNING id, username, title, body, pic, posted_at AS postedAt`,
        [sender_username, title, body, pic]);

      const announcement = result.rows[0];

      return announcement;
    }

    //If declined, delete the request from database.
    static async decline(id) {
        const result = await db.query(
            `DELETE
              FROM announcement_requests
              WHERE id = $1
              RETURNING id`, [id]);
              
        return declined = result.rows[0];
    }

}



module.exports = AnnouncementRequest;