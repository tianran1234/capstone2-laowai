"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Question = require("../models/question");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  await db.query(`DELETE FROM questions`);

  await db.query(`DELETE FROM users`);

  await db.query(`ALTER SEQUENCE questions_id_seq RESTART WITH 1`);

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    college: "abc",
    proficiencyOfChinese: "beginner",
    isAdmin: false,
  });

  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    college: "abc",
    proficiencyOfChinese: "beginner",
    password: "password2",
    isAdmin: false,
  });

  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    college: "abc",
    proficiencyOfChinese: "beginner",
    password: "password3",
    isAdmin: false,
  });

  await Question.create(
      "u1",
      {title: "new", body: "Can someone help me with grammar?"}
  );
  await Question.create(
      "u2",
      {title: "new2", body: "Can someone help me with vocabs?"}
  );
  await Question.create(
      "u3",
      {title: "new3", body: "Can someone help me with pronunciations?"}
  );

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


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
};
