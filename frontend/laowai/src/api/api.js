import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class LaoWaiApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${LaoWaiApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the user. */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get announcements */

  static async getAnnouncements() {
    let res = await this.request("announcements");
    return res.announcements;
  }

  /** Get details on an announcement by id. */

  static async getAnnouncement(id) {
    let res = await this.request(`announcements/${id}`);
    return res.announcement;
  }

  
   /** Create an announcement request. */

   static async createAnnouncementRequest(username, data) {
    let res = await this.request("announcement_requests", data, "post");
    return res.request;
  }


  /** Get list of friends of a user*/

  static async getFriends(username) {
    let res = await this.request(`${username}/friends`);
    return res.friends;
  }


  /** Unfriend a user by id. */

  static async unfriendById(username, id) {
    let res = await this.request(`${username}/friends/${id}`, id, "delete");
    return res.unfriend;
  }

  /** Unfriend a user by username. */

  static async unfriendByName(currentUser, username) {
    let res = await this.request(`${username}/unfriend`, {}, "delete");
    return res.unfriend;
  }


  /** Get list of friend requests of a user */

  static async getFriendRequests(username) {
    let res = await this.request(`${username}/friend_requests`);
    return res.requests;
  }

  /** Send a friend request. */

  static async createFriendRequest(data) {
    let res = await this.request(`${data.username}/friend_requests/new`, data, "post");
    return res.requests;
  }

  /** Accept a friend request. */

  static async acceptFriend(id, username) {
    let res = await this.request(`${username}/friend_requests/${id}/accept`, {}, "post");
    return res.result;
  }

  /** Decline a friend request. */

  static async declineFriend(username, id) {
    let res = await this.request(`${username}/friend_requests/${id}/decline`, id, "delete");
    return res.declined;
  }

   /** Get list of posts  */

  static async getPosts(username) {
    let res = await this.request(`${username}/posts`);
    return res.posts;
  }

  /** Get a post by id  */

  static async getPost(username, id) {
    let res = await this.request(`${username}/posts/${id}`);
    return res.post;
  }

  /** Delete a post by id. */

  static async deletePost(username, id) {
    let res = await this.request(`${username}/posts/${id}`, id, "delete");
    return res.post;
  }

  /** Create a post. */

  static async createPost(username, data) {
    let res = await this.request(`${username}/new_post`, data, "post");
    return res.post;
  }

  /** Get list of likes of a post */

  static async getLikes(username, id) {
    let res = await this.request(`${username}/posts/${id}/likes`);
    return res.likes;
  }
  /** Like a post by id. */

  static async like(id, username) {
    let res = await this.request(`${username}/posts/${id}/like`, {}, "post");
    return res.like;
  }

  /** Unlike a post by id. */

  static async unlike(id, username) {
    let res = await this.request(`${username}/posts/${id}/unlike`, {}, "delete");
    return res.unlike;
  }


  /** Get list of questions for forum */

  static async getQuestions() {
    let res = await this.request("forum");
    return res.questions;
  }


  /** Get details on a question by id. */

  static async getQuestion(id) {
    let res = await this.request(`forum/${id}`);
    return res.question;
  }

  /** Create a new question. */

  static async createQuestion(username, data) {
    let res = await this.request(`forum/questions/new`, data, "post");
    return res.question;
  }

  /** Get answers on aquestion by id. */

  static async getAnswers(id) {
    let res = await this.request(`forum/${id}/answers`);
    return res.answers;
  }

  /** Create a new answer. */

  static async createAnswer(username, id, data) {
    let res = await this.request(`forum/${id}/answers`, data, "post");
    return res.answer;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async update(username, data) {
    let res = await this.request(`${username}/update`, data, "patch");
    return res.user;
  }
}


export default LaoWaiApi;
