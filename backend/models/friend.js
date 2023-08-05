"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");

/** Related functions for friends. */

class Friend {
    /** Given a username, get all friends of that user.
     *
     * Returns [{ id, friend_username, since}, ...]
     **/

    static async getAll(username) {
      const friends = await db.query(
        `SELECT f.id,
                f.friend_username AS friendUsername,
                f.since,
                u.header_image_url AS headerImageUrl
        FROM friends f
        LEFT JOIN users AS u on f.friend_username = u.username
        WHERE f.username = $1
        ORDER BY since DESC`,
              [username]);
      return friends.rows;
    }

    /** Given friend's id, return data about friend.
   *
   * Returns { username}
   *
   * Throws NotFoundError if friend not found.
   **/
    static async get(id) {
      const result = await db.query(
        `SELECT f.id,
                f.friend_username AS friendUsername,
                f.since,
                u.header_image_url AS u.headerImageUrl
        FROM friends f
        LEFT JOIN users AS u on f.friend_username = u.username
        WHERE f.id = $1`,
            [id],
      );
  
      const friend = result.rows[0];
  
      if (!friend) throw new NotFoundError(`No Friend Found: ${id}`);

      return friend;
    
    }


    /** Delete given friend from database by id; returns undefined.
       *
       * Throws NotFoundError if friend not found.
       * 
    **/ 

    static async unfriendById(id) {
      const deleted = await db.query(
          `DELETE
          FROM friends
          WHERE id = $1
          RETURNING username, friend_username AS friendUsername`, [id]);

      const username = deleted.rows[0].username;
      const friendusername = deleted.rows[0].friendusername;

      const result = await db.query(
        `DELETE
          FROM friends
          WHERE username = $1 AND friend_username = $2
          RETURNING id`, [friendusername, username]);

      const unfriend = result.rows[0];

      if (!unfriend) throw new NotFoundError(`Not Friend: ${id}`);

      return unfriend;
    }

    /** Delete given friend from database by name; returns undefined.
    *
    * Throws NotFoundError if friend not found.
    * 
    **/ 

    static async unfriendByName(username, friend_username) {
      const result1 = await db.query(
          `DELETE
          FROM friends
          WHERE username = $1 AND friend_username = $2
          RETURNING friend_username`, [username, friend_username]);

      const result2 = await db.query(
        `DELETE
        FROM friends
        WHERE username = $1 AND friend_username = $2
        RETURNING friend_username`, [friend_username, username]);

      const result = [];
      result.push(result1.rows[0]);
      result.push(result2.rows[0]);
          
      const unfriend = result;

      if (!unfriend) throw new NotFoundError(`Not Friend: ${friend_username}`);
    
      return unfriend;

    }

}


module.exports = Friend;

