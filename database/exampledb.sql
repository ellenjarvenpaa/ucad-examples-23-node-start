DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

-- Create tables
CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE UserRelationships (
    RelationshipID INT PRIMARY KEY AUTO_INCREMENT,
    FollowerUserID INT,
    FollowingUserID INT,
    RelationshipStatus ENUM('Pending', 'Accepted', 'Declined') DEFAULT 'Pending',
    RequestDate TIMESTAMP,
    AcceptanceDate TIMESTAMP,
    FOREIGN KEY (FollowerUserID) REFERENCES Users(user_id),
    FOREIGN KEY (FollowingUserID) REFERENCES Users(user_id)
);

-- add users
INSERT INTO Users 
  VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users 
  VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);

-- add media items
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg', null),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg', null),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg', null);


-- add user relationship data
INSERT INTO UserRelationships (FollowerUserID, FollowingUserID, 
RelationshipStatus, RequestDate, AcceptanceDate)
VALUES (260, 305, 'Accepted', null, null),
       (305, 260, 'Declined', null, null);

SELECT RelationshipStatus FROM UserRelationships WHERE FollowerUserID = 260;
UPDATE UserRelationships SET RelationshipStatus = 'Pending' WHERE FollowerUserID = 305;
DELETE FROM UserRelationships WHERE RelationshipStatus = 'Pending';


