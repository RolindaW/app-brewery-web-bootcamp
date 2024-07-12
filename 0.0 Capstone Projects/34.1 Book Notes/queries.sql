-- Database --

CREATE DATABASE "book-notes"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Tables --

CREATE TABLE user_account (
	id SERIAL PRIMARY KEY,
	name VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE book (
	id SERIAL PRIMARY KEY,
	title TEXT UNIQUE NOT NULL,
	description TEXT
);

CREATE TYPE book_identifier_type AS ENUM ('ISBN', 'OCLC', 'LCCN', 'OLID', 'ID');

CREATE TABLE book_identifier (
	id SERIAL PRIMARY KEY,
	identifier_type BOOK_IDENTIFIER_TYPE NOT NULL,
	val TEXT NOT NULL,
	book_id INTEGER REFERENCES book(id),
	UNIQUE(book_id, identifier_type)
);

CREATE TABLE note (
	id SERIAL PRIMARY KEY,
	val TEXT NOT NULL,
	ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INTEGER REFERENCES user_account(id),
	book_id INTEGER REFERENCES book(id)
);

-- Data --

INSERT INTO user_account (name)
VALUES ('foo username'), ('bar username');

INSERT INTO book (title, description)
VALUES ('baz book', 'useless description');

INSERT INTO book_identifier (identifier_type, val, book_id)
VALUES ('ISBN', '9780672337475', 1);

-- Warning! Wait a time lapse between each execution to obtain different timestamps --

INSERT INTO note (val, user_id, book_id)
VALUES ('note 1', 1, 1);

INSERT INTO note (val, user_id, book_id)
VALUES ('note 2', 1, 1);

INSERT INTO note (val, user_id, book_id)
VALUES ('note 1b', 2, 1);

INSERT INTO note (val, user_id, book_id)
VALUES ('note 3', 1, 1);

-- Select --

SELECT COUNT(book.id) AS note_count, book.*
FROM book
JOIN note ON book.id = note.book_id
WHERE note.user_id = 1
GROUP BY book.id;
