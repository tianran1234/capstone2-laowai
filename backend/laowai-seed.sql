-- all test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, college, proficiency_of_Chinese, is_admin)
VALUES ('testuser1',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test1',
        'User1',
        'testuser1@gmail.com',
        'UVA',
        'beginner',
        FALSE),
        ('testuser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test2',
        'User2',
        'testuser2@gmail.com',
        'UVA',
        'Intermediate-mid',
        FALSE),
        ('testuser3',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test3',
        'User3',
        'testuser3@gmail.com',
        'UVA',
        'Advanced',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'testadmin@gmail.com',
        'UVA',
        'Native',
        TRUE);

INSERT INTO announcements (username,
                       title,
                       body,
                       pic)
VALUES ('testadmin', 'Panda Workshop', 'Great news everyone! Panda Workshop will be hosted on zoom. Time TBA.',
        'https://www.jobskills.org/wp-content/uploads/2022/12/cute-panda-thegem-blog-default.jpg'),
       ('testadmin', 'HSK tests for Fall 2023', 'Please register for HSK tests for Fall 2023 ASAP.', NULL);


INSERT INTO announcement_requests (sender_username,
                       title,
                       body,
                       pic)
VALUES ('testuser1', 'New national scholarship available for exchange students', 'Please click the link here to apply: www.nationalscholarship.com',
        NULL);

       

INSERT INTO posts (username, body, pic)
VALUES ('testuser1', 'Just got admitted into UVA flagship Chinese program!!!', NULL),
       ('testuser2', 'Cannot wait to travel to Beijing in September!!!', 'https://cdn.britannica.com/03/198203-050-138BB1C3/entrance-Gate-of-Divine-Might-Beijing-Forbidden.jpg'),
       ('testadmin', 'Please follow all the laws and regulations when using this website!', NULL);


INSERT INTO likes (post_id, username)
VALUES (1, 'testuser1'),
       (2, 'testuser2'),
       (3, 'testuser1'),
       (3, 'testuser2'),
       (3, 'testuser3');


INSERT INTO friends (username, friend_username)  
VALUES ('testuser2','testuser1'),
       ('testuser1','testuser2'),
       ('testuser1','testadmin'),
       ('testadmin','testuser1'),
       ('testuser3','testadmin'),
       ('testadmin','testuser3');
     

INSERT INTO friend_requests (sender_username, receiver_username)  
VALUES ('testuser3','testuser1'),
       ('testuser2','testadmin');


INSERT INTO follows (followed_username, following_username)  
VALUES ('testuser2','testuser1'),
       ('testuser1','testuser2'),
       ('testuser3','testuser1'),
       ('testuser1','testadmin'),
       ('testuser2','testadmin'),
       ('testuser3','testadmin'),
       ('testadmin','testuser1'),
       ('testadmin','testuser2'),
       ('testadmin','testuser3');

INSERT INTO followers (username, follower_username)  
VALUES ('testuser2','testuser1'),
       ('testuser1','testuser2'),
       ('testuser3','testuser1'),
       ('testuser1','testadmin'),
       ('testuser2','testadmin'),
       ('testuser3','testadmin'),
       ('testadmin','testuser1'),
       ('testadmin','testuser2'),
       ('testadmin','testuser3');


INSERT INTO questions (username, title, body)
VALUES ('testuser1','Panda Workshop', 'Does anyone know when it will be hold?'),
       ('testuser3','Scholarship', 'Is it available to any students?');


INSERT INTO answers (username, question_id, body)
VALUES ('testuser2', '1', 'Not sure. I think it says time TBA under announcements.'),
       ('testuser1', '2', 'No. The sholarship is only available to exchange students.');

