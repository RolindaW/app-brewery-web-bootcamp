# Book Notes

Application to store notes of your favorite books.

## Features

-   Register new user (multi-user support).
-   Register new book.
-   List the books for which a user have generated notes.
-   Add multiple personal notes for each book.

## Database

### Tables

-   user: store registered users.
-   book: a book entity.
-   book-identifier: different ways of identificating a book (e.g. ISBN, OCLC, LCCN, OLID and ID).
-   note: dated user comment on a book; can exist multiple.

### Relationships

-   user: note (one-many)
-   book: book-identifier (one-many)
-   book-identifier: book (many-one)
-   note: user (many-one); book (one-many)
