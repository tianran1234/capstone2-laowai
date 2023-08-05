"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");

/** Related functions for followers. */

class Follower {

    /** Given a username, get all followers of that user.
     *
     * Returns [{ id, follower_username, since}, ...]
     **/

    static async getAll(username) {
        const result = await db.query(
        `SELECT f.id,
                f.follower_username AS followerUsername,
                f.since,
                u.header_image_url AS headerImageUrl
        FROM followers f
        LEFT JOIN users AS u ON f.follower_username = u.username
        WHERE f.username = $1
        ORDER BY since DESC`,
                [username]);

        const followers = result.rows;

        if (!followers) throw new NotFoundError(`No followers yet.`);

        return followers;
    }

    /** Add a follower, update db.
     *
     * Returns { id, follower_username, username, since }
     * 
     * */
    
    static async add({username, follower_username}) { 
        const result = await db.query(
            `INSERT INTO followers (
                username,
                follower_username,
                since
                )
            VALUES ($1, $2, current_timestamp)
            RETURNING id, username, follower_username AS followerUsername, since`
            [username, follower_username]);

        return result.rows[0];
    }

    /** Given id of a follower, return data about that follwer.
     *
     * Throws NotFoundError if follower not found.
     **/
    static async get(id) {
        const result = await db.query(
            `SELECT f.id,
                f.username,
                f.follower_username AS followerUsername,
                f.since, 
                u.header_image_url AS headerImageUrl
        FROM followers f
        LEFT JOIN users AS u ON f.follower_username = u.username
        WHERE f.id = $1`,
            [id],
        );

        const follower = result.rows[0];

        if (!follower) throw new NotFoundError(`Not Found: ${follower_username}`);

        return follower;
    
    }

    /** Delete given follower from database; returns undefined.
     *
     * Throws NotFoundError if follower not found.
     * 
     **/

    static async remove(username, follower_username) {
        const result = await db.query(
            `DELETE
             FROM followers
             WHERE username = $1 AND follower_username = $2
             RETURNING id`, [username, follower_username]);
        const unfollow = result.rows[0];
  
        if (!unfollow) throw new NotFoundError(`No Follower Found: ${follower_username}`); 
    }

}


module.exports = Follower;