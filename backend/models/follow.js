"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");

/** Related functions for following. */

class Follow {

    /** Given a username, get all follows of that user.
     *
     * Returns [{ id, followed_username, since, header_image_url }, ...]
     **/

    static async getAll(username) {
        const result = await db.query(
        `SELECT f.id,
                f.followed_username AS followedUsername,
                f.since,
                u.header_image_url AS headerImageUrl
        FROM follows AS f
        LEFT JOIN users AS u ON f.followed_username = u.username
        WHERE following_username = $1
        ORDER BY since DESC`,
                [username]);
                
        const follows = result.rows;

        if (!follows) throw new NotFoundError(`Not following anyone yet.`);

        return follows;
    }

    /** Follow a user, update db, return following data.
     *
     * data should be { following_username, followed_username }
     *
     * Returns { id, following_username, followed_username, since }
     *
     * Unfollow if already following.
     * */
    
    static async follow({following_username, followed_username}) {
        const result = await db.query(
            `INSERT INTO follows (
                                  following_username, 
                                  followed_username,
                                  since
                                 )
                VALUES ($1, $2, current_timestamp)
                RETURNING id, following_username AS followingUsername, followed_username AS followedUsername, since`,
            [following_username, followed_username]);

        return result.rows[0];
    }

    /** Given id of the user being followed, return data about that user.
     *
     * Returns { follow_id, username}
     *
     * Throws NotFoundError if follow not found.
     **/
    static async get(id) {
        const result = await db.query(
            `SELECT f.id,
                followed_username AS followedUsername,
                following_username AS followingUsername,
                since
        FROM follows 
        WHERE id = $1`,
            [id],
        );

        const follow = result.rows[0];

        if (!follow) throw new NotFoundError(`Not Found`);

        return follow;
    
    }

    /** Delete given follow by id from database; returns undefined.
     *
     * Throws NotFoundError if follow not found.
     * 
     **/

    static async unfollowById(id) {
        const result = await db.query(
            `DELETE
             FROM follows
             WHERE id = $1
             RETURNING id`, [id]);
        const unfollow = result.rows[0];
  
        if (!unfollow) throw new NotFoundError(`Not Following: ${id}`);

        return unfollow;
    }


    /** Delete given follow by username from database; returns undefined.
     *
     * Throws NotFoundError if follow not found.
     * 
     **/

    static async unfollowByName(following_username, followed_username) {
        const result = await db.query(
            `DELETE
             FROM follows
             WHERE following_username = $1 AND followed_username = $2
             RETURNING followed_username`, [following_username, followed_username]);
        const unfollow = result.rows[0];
  
        if (!unfollow) throw new NotFoundError(`Not Following: ${followed_username}`);
    }

}


module.exports = Follow;