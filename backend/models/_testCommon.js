const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {

  await db.query(`DELETE FROM questions`);

  await db.query(`DELETE FROM users`);

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email,
                          college,
                          proficiency_of_Chinese)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com', 'abc', 'beginner'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com', 'abc', 'beginner'),
               ('u3', $3, 'U3F', 'U3L', 'u3@email.com', 'abc', 'beginner')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password3", BCRYPT_WORK_FACTOR),
      ]);

  await db.query(`
  INSERT INTO questions (username, title, body)
  VALUES ('u1', 'q1', 'c1'),
          ('u2', 'q2', 'c1'),
          ('u3', 'q3', 'c1')
  RETURNING id`);

}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};