CREATE DATABASE IF NOT EXISTS hack_app;
USE hack_app;

-- Drop tables in reverse order to avoid foreign key dependency issues
DROP TABLE IF EXISTS customizable;
DROP TABLE IF EXISTS quest;
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS player;

-- Create the player table
CREATE TABLE IF NOT EXISTS player (
    username VARCHAR(20) PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

-- Create the class table
CREATE TABLE IF NOT EXISTS class (
    username VARCHAR(20),
    class_name VARCHAR(20),
    lvl INT,
    lvl_point INT,
    PRIMARY KEY (username, class_name, lvl), -- Composite primary key
    FOREIGN KEY (username) REFERENCES player(username) ON DELETE CASCADE
);

-- Add a unique constraint on (class_name, lvl) in the class table
ALTER TABLE class
ADD UNIQUE (class_name, lvl);

-- Create the quest table
CREATE TABLE IF NOT EXISTS quest (
    class_name VARCHAR(20),
    lvl INT,
    quest_name VARCHAR(20),
    quest_desc VARCHAR(100),
    quest_title VARCHAR(50), -- Changed to VARCHAR for flexibility
    PRIMARY KEY (class_name, lvl, quest_name), -- Composite primary key
    FOREIGN KEY (class_name, lvl) REFERENCES class(class_name, lvl) ON DELETE CASCADE
);

-- Create the customizable table
CREATE TABLE IF NOT EXISTS customizable (
    username VARCHAR(20),
    item_name VARCHAR(20),
    item_id INT,
    PRIMARY KEY (username, item_id), -- Composite primary key
    FOREIGN KEY (username) REFERENCES player(username) ON DELETE CASCADE
);