/** Post class for LaoWai */

/** Posts on user's individual site. */

const db = require("../db");
const ExpressError = require("../expressError");


class Post {

  /** Get all posts.
     *
     * Returns [{ id, username, body, pic, posted_at, likes }, ...]
     * */

  static async getAll(username) {
    const result = await db.query(
      `SELECT id,
              username,
              body,
              pic,
              posted_at AS postedAt
      FROM posts
      WHERE username = $1
      ORDER BY posted_at DESC`,
          [username]);

      const posts = result.rows;

      if (!posts) throw new NotFoundError(`No posts posted yet.`);
  
      return posts;
  }

  /** create new post -- returns
   *    {id, username, body, pic, posted_at }
   */

  static async create(username, data) {
    const result = await db.query(
        `INSERT INTO posts (
            username, 
            body, 
            pic, 
            posted_at)
        VALUES ($1, $2, $3, current_timestamp)
        RETURNING id, username, body, pic, posted_at AS postedAt`,
        [username, data.body, data.pic]);

    const post = result.rows[0];

    return post;
  }

  /** Given a post id, return data about post.
   *
   * Returns { id, body, pic, posted_at, likes }
   *
   * Throws NotFoundError if post not found.
   **/

  static async get(id) {
    const result = await db.query(
      `SELECT p.id,
              p.username,
              p.body,
              p.pic,
              p.posted_at AS postedAt,
              l.username AS likedby
      FROM posts p
        LEFT JOIN likes AS l ON p.id = l.post_id
      WHERE p.id = $1` ,
          [id]
    );
    const post = result.rows;
    
    return post;
   }

   /** Delete given post from database; returns undefined.
   *
   * Throws NotFoundError if post not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM posts
           WHERE id = $1
           RETURNING id`,
        [id]);

    const post = result.rows[0];

    if (!post) throw new NotFoundError(`No Post: ${id}`);

    return post;
  }

}


module.exports = Post;