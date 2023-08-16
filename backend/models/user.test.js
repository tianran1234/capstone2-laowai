"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("u1", "password1");
    expect(user).toEqual(
      expect.objectContaining({
      username: "u1",
      firstname: "U1F",
      lastname: "U1L",
      email: "u1@email.com",
      isadmin: false,
      college: "abc",
      proficiencyofchinese: "beginner",
    }));
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("unauth if wrong password", async function () {
    try {
      await User.authenticate("c1", "wrong");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("register", function () {
  const newUser = {
    username: "new",
    firstName: "Test",
    lastName: "Tester",
    email: "test@test.com",
    isAdmin: false,
    college: "abc",
    proficiencyOfChinese: "beginner",
  };

  test("works", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
    });
    
    expect(user).toEqual(
      expect.objectContaining({
      username: "new",
      firstname: "Test",
      lastname: "Tester",
      email: "test@test.com",
      isadmin: false,
      college: "abc",
      proficiencyofchinese: "beginner",
    }));
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].is_admin).toEqual(false);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });


  test("bad request with dup data", async function () {
    try {
      await User.register({
        ...newUser,
        password: "password",
      });
      await User.register({
        ...newUser,
        password: "password",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** getAll */

describe("getAll", function () {
  test("works", async function () {
    const users = await User.getAll();
    expect(users).toEqual(
      expect.arrayContaining([
      {
        username: "u1",
        firstname: "U1F",
        lastname: "U1L",
        email: "u1@email.com",
      },
      {
        username: "u2",
        firstname: "U2F",
        lastname: "U2L",
        email: "u2@email.com",
      },
      {
        username: "u3",
        firstname: "U3F",
        lastname: "U3L",
        email: "u3@email.com",
      },
    ]));
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let user = await User.get("u1");
    expect(user).toEqual(
      expect.objectContaining({
      username: "u1",
      firstname: "U1F",
      lastname: "U1L",
      email: "u1@email.com",
      isadmin: false,
      college: "abc",
      proficiencyofchinese: "beginner",
    }));
  });

  test("not found if no such user", async function () {
    try {
      await User.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});


/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await User.remove("u1");
    const res = await db.query(
        "SELECT * FROM users WHERE username='u1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such user", async function () {
    try {
      await User.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

