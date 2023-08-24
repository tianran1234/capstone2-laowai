"use strict";

const db = require("../db");

/** Related functions for friend requests. */

class FriendRequest {
  /** Get all friend requests.
   *
   * Returns [{ id, sender_username, sent_at }, ...]
   **/

  static async getAll(username) {
    const result = await db.query(
      `SELECT id,
              sender_username AS senderUsername,
              sent_at AS sentAt
      FROM friend_requests
      WHERE receiver_username = $1
      ORDER BY sentAt DESC`,
      [username]);

    const requests = result.rows;

    if (!requests) throw new NotFoundError(`No Friend Requests.`);

    return requests;
  }


  /** Send a friend request.
   *
   * request data should be {sender_username, receiver_username}
   *
   * Returns { id, sender_username, receiver_username, sent_at }
   *
   * throw an error if already added that friend.
   * */

  static async create(sender_username, receiver_username) {

    const duplicateCheck = await db.query(
      `SELECT receiver_username AS receiverUsername
          FROM friend_requests
          WHERE sender_username =$1 AND receiver_username = $2`,
      [sender_username, receiver_username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Already sent a request to: ${receiver_username}`);
    }

    const result = await db.query(
      `INSERT INTO friend_requests (
                                      sender_username, 
                                      receiver_username, 
                                      sent_at
                                    )
            VALUES ($1, $2, current_timestamp)
            RETURNING id, sender_username AS senderUsername, receiver_username AS receiverUsername, sent_at AS sentAt`,
      [sender_username, receiver_username]);

    return result.rows[0];

  }


  // If accepted, delete the request from database, update friend db, return new friend data.
  static async accept(id, username) {

    const deleted = await db.query(
      `DELETE
          FROM friend_requests
          WHERE id = $1
          RETURNING sender_username AS senderUsername`,
      [id]);

    const senderusername = deleted.rows[0].senderusername;

    const result1 = await db.query(
      `INSERT INTO friends (
                              username,
                              friend_username,
                              since
                             )
            VALUES ($1, $2, current_timestamp)
            RETURNING id, username, friend_username AS friendUsername, since`,
      [username, senderusername]);

    const result2 = await db.query(
      `INSERT INTO friends (
                                username,
                                friend_username,
                                since
                               )
              VALUES ($1, $2, current_timestamp)
              RETURNING id, username, friend_username AS friendUsername, since`,
      [senderusername, username]);

    let result = [];
    result.push(result1.rows[0]);
    result.push(result2.rows[0]);

    return result;
  }

  //If declined, delete the request from database.
  static async decline(id) {
    const result = await db.query(
      `DELETE
              FROM friend_requests
              WHERE id = $1
              RETURNING id`, [id]);

    let declined = result;
    return declined;
  }

}



module.exports = FriendRequest;