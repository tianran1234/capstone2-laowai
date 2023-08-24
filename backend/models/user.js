"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {

  /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email }, ...]
   **/

  static async getAll() {
    const result = await db.query(
          `SELECT username,
                  first_name AS firstName,
                  last_name AS lastName,
                  email
           FROM users
           ORDER BY username`
    );

    return result.rows;
  }

  
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, image_url, header_image_url, college, 
   *          proficiency_of_Chinese, current_city, hometown, since, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT username,
                  password,
                  first_name AS firstName,
                  last_name AS lastName,
                  email,
                  image_url AS imageUrl, 
                  header_image_url AS headerImageUrl,
                  college,
                  proficiency_of_Chinese AS proficiencyOfChinese,
                  current_city AS currentCity,
                  hometown, 
                  is_admin as isAdmin,
                  since
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
     
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }


  /** Register user with data.
   *
   * Returns { username, password, first_name, last_name, email, image_url, header_image_url,
   *          college, proficiency_of_Chinese, current_city, hometown, since, is_admin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({ username, password, firstName, lastName, email, imageUrl, headerImageUrl, 
                         college, proficiencyOfChinese, currentCity, hometown, isAdmin}) {
    
    const duplicateCheck = await db.query(
      `SELECT username
        FROM users
        WHERE username = $1`,
    [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate Username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            image_url, 
            header_image_url,
            college,
            proficiency_of_Chinese,
            current_city,
            hometown, 
            is_admin,
            since)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, current_timestamp)
           RETURNING username, password, first_name AS firstName, last_name AS lastName, email, image_url AS imageUrl, header_image_url AS headerImageUrl, college,
                    proficiency_of_Chinese AS proficiencyOfChinese, current_city AS currentCity, hometown, is_admin as isAdmin, since`,
        [
          username,
          hashedPassword,
          firstName,
          lastName, 
          email, 
          imageUrl, 
          headerImageUrl,           
          college, 
          proficiencyOfChinese, 
          currentCity, 
          hometown,
          isAdmin,
        ],
    );

    const user = result.rows[0];

    return user;
  }


  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, email, image_url, header_image_url, college, proficiency_of_Chinese, 
   *          current_city, hometown, is_admin, since }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const result = await db.query(
          `SELECT u.username,
                  u.first_name AS firstName,
                  u.last_name AS lastName,
                  u.email,
                  u.image_url AS imageUrl, 
                  u.header_image_url AS headerImageUrl,
                  u.college,
                  u.proficiency_of_Chinese AS proficiencyOfChinese,
                  u.current_city AS currentCity,
                  u.hometown,
                  u.is_admin AS isAdmin,
                  u.since,
                  f.friend_username AS friendUsername,
                  r.sender_username AS senderUsername
           FROM users u
            LEFT JOIN friends AS f ON u.username = f.username
            LEFT JOIN friend_requests AS r ON u.username = r.receiver_username
           WHERE u.username = $1`,
        [username]
    );

    const users = result.rows;

    if (!users[0]) throw new NotFoundError(`No User: ${username}`);

    return users;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { first_name, last_name, password, email, image_url, header_image_url, college, proficiency_of_Chinese, current_city }
   *
   * Returns { username, password, first_name, last_name, email, image_url, header_image_url, college, proficiency_of_Chinese, current-city, hometown, since, is_admin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          first_name: "first_name",
          last_name: "last_name",
          password: "password", 
          email: "email", 
          image_url: "image_url", 
          header_image_url: "header_image_url", 
          college: "college", 
          proficiency_of_Chinese: "proficiency_of_Chinese", 
          current_city: "current_city", 
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                password,
                                first_name AS firstName,
                                last_name AS lastName,
                                email,
                                image_url AS imageUrl, 
                                header_image_url AS headerImageUrl,
                                college,
                                proficiency_of_Chinese AS proficiencyOfChinese,
                                current_city AS currentCity,
                                hometown, 
                                is_admin as isAdmin,
                                since`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No User: ${username}`);

    delete user.password;

    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No User: ${username}`);
  }

}
  



module.exports = User;
