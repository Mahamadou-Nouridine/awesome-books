import books from "./data.js";

class BooksCollection {
  static add(title, author, id = books.length) {
    books.push({id, title, author})
  }

  static delete(id) {
    books = books.filter(book => book.id != id)
  }
}
