const nav = document.querySelector('.nav');
const date = document.querySelector('.date');
const bookList = document.querySelector('.book-list');
const titleInput = document.querySelector('.title');
const authorInput = document.querySelector('.author');
const addBtn = document.querySelector('.add');
const sections = document.querySelectorAll('.section');
let button;
let navBtn;
let books = [];

class Book {
  date = new Date();

  id = (`${Date.now()}`).slice(-10);

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function getDate() {
  const currentdate = new Date();
  const datetime = `${currentdate.getDate()}/${
    currentdate.getMonth() + 1
  }/${currentdate.getFullYear()}, ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
  date.innerHTML = datetime;
}

setInterval(getDate, 1000);

const checkBooks = () => {
  if (books.length > 0) {
    bookList.classList.remove('hidden');
  }
  if (books.length === 0) {
    bookList.classList.add('hidden');
  }
};

const renderBook = (book) => {
  const html = `
        <li class="list-item" data-id=${book.id}>
                    <p class="list-para">
                        <span class="title">${book.title}</span>
                        by
                        <span class="author">${book.author}</span>
                    </p>
                    <button class="submit remove" type="button">Remove</button>
                </li>
    `;
  bookList.insertAdjacentHTML('afterbegin', html);
};

const setLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

const getLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('books'));

  if (!data) return;

  books = data;

  books.forEach((book) => {
    renderBook(book);
  });
};

getLocalStorage();

addBtn.addEventListener('click', () => {
  const author = authorInput.value;
  const title = titleInput.value;

  if (!author || !title) return;

  const book = new Book(title, author);
  renderBook(book);
  books.push(book);
  setLocalStorage(books);

  authorInput.value = '';
  titleInput.value = '';
});

bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    button = e.target;
  }
  const bookLi = button.closest('.list-item');
  books = books.filter((book) => book.id !== bookLi.dataset.id);
  setLocalStorage(books);
  bookList.innerHTML = '';
  books.forEach((book) => {
    renderBook(book);
  });
});

nav.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__link')) {
    navBtn = e.target;
  }
  const navLi = navBtn.getAttribute('href');
  const siblings = navBtn.closest('.nav').querySelectorAll('.nav__link');
  siblings.forEach((sibling) => {
    sibling.classList.remove('blue');
    if (sibling === navBtn) {
      sibling.classList.toggle('blue');
    }
  });

  sections.forEach((section) => section.classList.remove('active'));
  document.querySelector(navLi).classList.toggle('active');

  checkBooks();
});
