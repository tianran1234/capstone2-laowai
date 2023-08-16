# Capstone2-LaoWai website

This is a social media website dedicated to connect all Chinese language learners, to create a platform where Chinese educators can share their resources and information beyond classroom, and where the language learners can meet each other, practice with other fellow learners, ask questions, post answers, share their daily lives etc. 

It includes the postgresql database, the flask backend and the react.js front end of the LaoWai app.


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

The browser will automatically direct you to the designated portal once the server and the front end start running.

Here is a screen shot of the homepage: 
![laowai-homepage](https://github.com/tianran1234/laowai/assets/115170399/83d32283-3525-411a-bb39-f20152314066)

 
A user will be able to browse the announcements and the forum questions (including answers if there is any) without sign up or log in their own account.

If a user would like to look up other users by users’ names, they will need to register/log in account first.

Once registered/logged in, they will be able to send request to make an announcement, to post a question on forum, or to post answers to forum questions. 

On their personal page, it will display some of the user’s personal information (username, affiliation, proficiency in Chinese, hometown, current city etc). A user will also be able to make new personal posts, accept/decline any friend requests, and manage their current friend list.

A logged in user will also be able to visit other users’ personal pages, view their posts and like/unlike the posts. They will also be able to send friend request/unfriend that user. But they won’t be able to access other users’ friend requests or friend lists.


## Testing

To run the backend tests:

```bash
    jest 
```

To run the frontend tests:

```bash
npm test 
```
