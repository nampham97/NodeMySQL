CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
    id INT NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users ADD PRIMARY KEY (id);

ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE users;

CREATE TABLE links(
    id int(11) NOT NULL,
    title varchar(150) NOT NULL,
    url varchar(255) NOT NULL,
    description TEXT,
    user_id int(11),
    created_at timestamp not null DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

alter table links add PRIMARY KEY (id);
ALTER TABLE links MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE links;