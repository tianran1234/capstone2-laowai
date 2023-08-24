"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /forum/questions/new*/

describe("POST /forum/questions/new", function () {
  const newQuestion = (
    "u1",
   {title: "new", body: "Can someone help me with this?"}
  )

  test("ok for logged-in user", async function () {
    const resp = await request(app)
        .post("/forum/questions/new")
        .send(newQuestion)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body.question).toEqual(
      expect.objectContaining({
        username: "u1",
        title: "new", 
        body: "Can someone help me with this?"
    }));
  });

  test("unauth for non-user", async function () {
    const resp = await request(app)
        .post("/forum/questions/new")
        .send(newQuestion)
        .set("authorization", `Bearer null`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/forum/questions/new")
        .send({
          username: "u1",
          data: {title: "new",}
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

});

/************************************** GET /forum */

describe("GET /forum", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/forum");
    expect(resp.body.questions.length).toEqual(3);
  });
});

/************************************** GET /forum/:id */

describe("GET /forum/:id", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/forum/1`);
    expect(resp.body.question).toEqual(
      expect.objectContaining(
       {
        id: 1,
        username: "u1",
        title: "new",
        body: "Can someone help me with grammar?",
      },
    ));
  });


  test("not found for a non-exsit id", async function () {
    const resp = await request(app).get(`/forum/999`);
    expect(resp.statusCode).toEqual(404);
  });
});





