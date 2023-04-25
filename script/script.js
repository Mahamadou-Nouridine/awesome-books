import data from "./data.js";

const booksContainer = document.querySelector(".books");
const form = document.querySelector("form");
const titleEl = document.querySelector("#title");
const authorEl = document.querySelector("#author");

const localData = localStorage.getItem("books");
if (!localData) localStorage.setItem("books", JSON.stringify(data));
let books = JSON.parse(localStorage.getItem("books"));

const saveLocally = () => {
  localStorage.setItem("books", JSON.stringify(books));
};

class BooksCollection {
  static add = (title, author, id = Date.now()) => {
    books.push({ title, author, id });
    saveLocally();
    titleEl.value = "";
    authorEl.value = "";
  };

  static remove = (id) => {
    const remainingData = books.filter((book) => book.id !== id);
    books = remainingData;
    saveLocally();
  };
}

const loadData = () => {
  booksContainer.innerHTML = "";
  books.forEach((book) => {
    const bookEl = document.createElement("div");
    bookEl.classList.add("book");
    bookEl.innerHTML = `
          <div class="book">
            <p class="title">${book.title}</p>
            <p class="author">${book.author}</p>
          </div>
          <button  class = 'removeButton-${book.id}' id='${book.id}' >Remove</button>
`;

    booksContainer.appendChild(bookEl);
    const removeButton = document.querySelector(`.removeButton-${book.id}`);
    removeButton.addEventListener("click", () => {
      BooksCollection.remove(book.id);
      loadData();
    });
  });
};

// add data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  BooksCollection.add(titleEl.value, authorEl.value);
  loadData();
});

loadData();
