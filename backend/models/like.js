"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");

/** Related functions for likes. */

class Like {

    /** Get all likes.
         *
         * Returns [{ username}, ...]
         * */

    static async getAll(id) {
        const result = await db.query(
        `SELECT 
            username
        FROM likes
        WHERE post_id = $1`
            [id]);
    
        const likes = result.rows;
    
        return likes;
    }


    /** Like a post, update db, return like data.
     *
     * data should be { post_id, username }
     *
     * Returns { id, post_id, username }
     *
     * Unlike if already liked.
     * */
    
    static async like(post_id, username) {

        const duplicateCheck = await db.query(
            `SELECT id
            FROM likes
            WHERE post_id = $1 AND username = $2`,
              [post_id, username],
          );
  
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Already Liked this post.`);
        }

        const result = await db.query(
            `INSERT INTO likes (
                                post_id,
                                username
                            )
                VALUES ($1, $2)
                RETURNING id, post_id, username`,
            [post_id, username]);

        const like = result.rows[0];

        return like;
    }

    /** Delete given like from database; returns undefined.
     *
     * Throws NotFoundError if like not found.
     * 
     **/ 

    static async unlike(id, username) {
        const result = await db.query(
            `DELETE
             FROM likes
             WHERE post_id = $1 AND username = $2
             RETURNING post_id AS postId`, [id, username]);
        const unlike = result.rows[0];
  
        if (!unlike) throw new NotFoundError(`Not Liked: ${post_id}`);

        return unlike;
    }

}


module.exports = Like;