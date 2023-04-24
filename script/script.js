import books from "./data.js";

const containerEl = document.querySelector(".books-container");
const formEl = document.querySelector(".form");
class BooksCollection {
  static add(title, author, id = books.length) {
    books.push({ id, title, author });
  }

  static delete(id) {
    books = books.filter((book) => book.id != id);
  }
}

formEl.addEventListener("submit", (e) => {
  console.log("submited");
  const title = document.querySelector(" #title").value;
  const author = document.querySelector("#author").value;
  console.log(title, author);

  BooksCollection.add(title, author);
  renderBooks();
  console.log(books);
});

const renderBooks = () => {
  containerEl.innerHTML = "";
  books.forEach((book) => {
    const bookEl = `<div class="book">
    <p class="title">${book.title}</p>
    <p class="author">${book.author}</p>
    <button>Remove</button>
    <hr>
  </div>`;

    containerEl.innerHTML += bookEl;
  });
};

renderBooks();
