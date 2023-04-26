const booksContainer = document.querySelector('.books-container');
const form = document.querySelector('.form');
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const noBook = document.querySelector('.no-book');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const saveLocally = (data) => {
  localStorage.setItem('books', JSON.stringify(data));
};

const displayNoBook = (bookLength) => {
  noBook.style.setProperty('display', `${bookLength ? 'none' : 'block'}`);
  booksContainer.style.setProperty('display', `${!bookLength ? 'none' : 'block'}`);
};

class BooksCollection {
  constructor() {
    let localData = localStorage.getItem('books');
    if (!localData) localStorage.setItem('books', JSON.stringify([]));
    localData = localStorage.getItem('books');
    this.books = JSON.parse(localData);
  }

    add = (title, author, id = Date.now()) => {
      this.books.push({ title, author, id });
      saveLocally(this.books);
      titleEl.value = '';
      authorEl.value = '';
    };

    remove = (id) => {
      const remainingData = this.books.filter((book) => book.id !== id);
      this.books = remainingData;
      saveLocally(this.books);
    };
}

const collection = new BooksCollection();

const loadData = () => {
  booksContainer.innerHTML = '';
  collection.books.forEach((book, key) => {
    const bookEl = document.createElement('div');
    bookEl.classList.add('book');
    bookEl.classList.add(`book-${key % 2 === 0 ? 'grey' : 'white'}`);
    bookEl.innerHTML = `
          <p class="title">${book.title} by ${book.author}</p>
          <button  id = 'removeButton-${book.id}' class='remove-button' >Remove</button>
`;

    booksContainer.appendChild(bookEl);
    const removeButton = document.querySelector(`#removeButton-${book.id}`);
    removeButton.addEventListener('click', () => {
      collection.remove(book.id);
      loadData();
    });
  });
  displayNoBook(collection.books.length);
};

// add data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  collection.add(titleEl.value, authorEl.value);
  loadData();
});

loadData();

const selectSection = (section) => {
  document.querySelector(`#nav-${section.id} p`).style.setProperty('color', 'blue');
  navLinks.forEach((link) => {
    if (link.id !== `nav-${section.id}`) {
      link.querySelector('p').style.setProperty('color', 'unset');
    }
  });

  sections.forEach((sec) => {
    if (sec.id !== section.id) {
      sec.style.setProperty('display', 'none');
    }

    section.style.setProperty('display', 'flex');
  });
};

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', () => {
    const id = navLink.id.split('-')[1];
    const section = document.querySelector(`#${id}`);
    selectSection(section);
  });
});

selectSection(document.querySelector('#list'));
