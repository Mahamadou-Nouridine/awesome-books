import data from "./data.js";
const booksContainer = document.querySelector(".books-container");
const form = document.querySelector('.form')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
let books = data;

class BooksCollection {
  static add = (title, author, id = Date.now()) => {
    books.push({title, author, id});
    console.log(books);
    loadData()
  };

  static remove = (id) => {
    const remainingData = books.filter((book) => book.id != id);
    books = remainingData;
    console.log(books);
    loadData();
  };
}

const loadData = () => {
  booksContainer.innerHTML = "";
  books.forEach((book) => {
    const bookEl = document.createElement("div");
    bookEl.classList.add("book");
    bookEl.innerHTML = `<div class="book">
        <p class="title">${book.title}</p>
        <p class="author">${book.author}</p>
        <button  class = 'removeButton-${book.id}' id='${book.id}' >Remove</button>
        <hr>
      </div>`;

    booksContainer.appendChild(bookEl);
    const removeButton = document.querySelector(`.removeButton-${book.id}`);
    removeButton.addEventListener("click", () => {
      BooksCollection.remove(book.id);
    });
  });
};

// add data
form.addEventListener('submit', (e) => {
    e.preventDefault()
    BooksCollection.add(title.value, author.value)
})

loadData();
