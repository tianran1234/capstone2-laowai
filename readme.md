# Capstone2-LaoWai website (http://localhost:3000/)

This is a social media website dedicated to connect all Chinese language learners, to create a platform where Chinese educators can share their resources and information beyond classroom, and where the language learners can meet each other, practice with other fellow learners, ask questions, post answers, share their daily lives etc. 

It includes the postgresql database, the flask backend and the react.js front end of the LaoWai app.


## LaoWai API

List all announcements: 
router.get("/announcements")

Look up details of a single announcement by id: 
router.get("/announcements/:id")

Create an announcement request:
router.post("/announcement_requests")


List all forum questions:
router.get("/forum")

Look up details of a single question with answers by id:
router.get("/forum/:id")

Create a new question:
router.post("/forum/questions/new")

Get answers on aquestion by id:
router.get("/forum/:id/answers")

Create a new answer:
router.post("/forum/:id/answers")

Get list of friends of a user:
router.get("/:username/friends")

 Unfriend a user by id:
 router.delete("/:username/friends/:id")

 Unfriend a user by username:
 router.delete("/:username/unfriend")

 Get list of friend requests of a user:
 router.get("/:username/friend_requests")
 
 Send a friend request:
 router.post("/:username/friend_requests/new")

 Accept a friend request:
 router.post("/:username/friend_requests/:id/accept")

 Decline a friend request:
 router.delete("/:username/friend_requests/:id/decline")

 Get list of posts of a user:
 router.get("/:username/posts")

 Get a post by id:
 router.get("/:username/posts/:id")

 Delete a post by id:
 router.delete("/:username/posts/:id")

 Create a post:
 router.post("/:username/new_post")

 Get list of likes of a post:
 router.get("/:username/posts/:id/likes")

 Like a post by id:
 router.post("/:username/posts/:id/like")

 Unlike a post by id:
 router.delete("/:username/posts/:id/unlike")

 Get token for login from username, password:
 router.post("/auth/token")
 
 Signup for site:
 router.post("/auth/register")
 
 

## Installation

To run the server:

Step 1: start postgresql 
```bash
sudo service postgresql start
```
Step 2: seed the database 
```bash
psql < laowai.sql
```
Step 3: switch node to a lower version (use nvm install instead if there is none) 
```bash
nvm use 14.18.3
```
Step 4: 
```bash
node server.js
```

To run the front end:

 Step 1: switch node to a lower version (use nvm install instead if there is none) 
```bash
nvm use 14.18.3
```
Step 2:
```bash
npm start
```


## Usage

### Credentials
A user's account has been created in the database. Once may use the credentails below to utilize the full functions of this app:
username: testuser1
password: password

### Homepage
The browser will automatically direct you to the designated portal (http://localhost:3000/) once the server and the front end start running.

Here is a screen shot of the homepage: 
![laowai-homepage](https://github.com/tianran1234/laowai/assets/115170399/83d32283-3525-411a-bb39-f20152314066)
 
A user will be able to browse the announcements and the forum (including questions along with answers if there is any) without sign up or log in their own account.

### Announcements
If one click on the "announcements" tab on the homepage, they will be directed to the announcement page. Here is a screen shot of the announcments page:
![announcements](https://github.com/tianran1234/laowai/assets/115170399/8f66c651-55db-4312-b3db-80e3b372ec0e)

Since one is not logged in, if one click on "request to make an announcement" button, they will be prompt to the log in page, as shown in the screen shot below:
![login](https://github.com/tianran1234/laowai/assets/115170399/f2d02afe-93c8-4271-a674-a70d380b66e3)

However, for a logged in user, they will see the request form like below:
![announcementrequest](https://github.com/tianran1234/laowai/assets/115170399/8474939e-acdf-4f40-b902-6a8b19d95b11)

Once you click on the title of an announcement, you will be able to view the details. Here is a screen shot of an announcement:
![announcement](https://github.com/tianran1234/laowai/assets/115170399/9b750f37-bc4a-46df-877f-d4482844a116)

### Forum
If one click on the "forum" tab on the homepage, they will be directed to the forum page as shown below:
![forum](https://github.com/tianran1234/laowai/assets/115170399/e944daa9-c402-447e-a5bf-ebfc2905e6f6)

Since one is not logged in, if one click on "post a question" button, they will be prompt to the log in page.

However, for a logged in user, they will see the question form like below:
![questionform](https://github.com/tianran1234/laowai/assets/115170399/c035bab6-7d61-4b89-a335-4a739046f818)

Once you click on the title of a question, you will be able to view the details of the question along with any answers. Here is a screen shot of:
![question](https://github.com/tianran1234/laowai/assets/115170399/43dcdef8-dfcf-42c8-b21a-b24f5fb7d745)

Since one is not logged in, if one click on "post an answer" button, they will be prompt to the log in page.

However, for a logged in user, they will see the answer form like below:
![answerform](https://github.com/tianran1234/laowai/assets/115170399/f03d4796-7e50-4801-aed1-a9d4263ccac7)

### Log in/ Sign up
A user can register/log in account by click on the "Log in" or "Sign up" tab on the homepage.

Here is a screen shot of what a sign up page looks like:
![singup](https://github.com/tianran1234/laowai/assets/115170399/3465674e-7bb0-4668-88ce-6e4b41c94627)

Once registered/logged in, they will be able to send request to make an announcement, to post a question on forum, or to post answers to forum questions, as well as access their personal account. 

### Account
A user can access their peronal account by click on the "Account" tab on the homepage as shown below:
![account](https://github.com/tianran1234/laowai/assets/115170399/fe78364e-88d3-4e9e-98a5-39f763e96fb4)

On their personal page, it will display some of the user’s personal information (username, affiliation, proficiency in Chinese, hometown, current city etc). A user will also be able to make new personal posts, manage their current friend list and accept/decline any friend requests.

### Search
A logged in user will also be able to visit other users’ personal pages by typing the username they need to look up in the search box in the navigation bar as shown below:
![search](https://github.com/tianran1234/laowai/assets/115170399/e1ae2fe3-ed52-4e91-8dc5-b38303df1b7f)

A user can view other user's posts and like/unlike the posts. They will also be able to send friend request/unfriend that user. But they won’t be able to access other users’ friend requests or friend lists.


## Testing

To run the backend tests:

```bash
jest [test_file_name]
```

To run the frontend tests:

```bash
npm test 
```
