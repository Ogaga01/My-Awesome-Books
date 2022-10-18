/* eslint-disable */

'use strict'

const nav = document.querySelector('.nav')
const navLinks = document.querySelector('.nav__links')
const date = document.querySelector('.date')
const bookList = document.querySelector('.book-list')
const removeBtn = document.querySelectorAll('.remove')
const titleInput = document.querySelector('.title')
const authorInput = document.querySelector('.author')
const addBtn = document.querySelector('.add')
const books = []

class Book {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const renderBook = (book) => {
    const html = `
        <li class="list-item" data-id=${book.id}>
                    <p class="list-para">
                        <span class="title">${book.title}</span>
                        by
                        <span class="author">${book.author}</span>
                    </p>
                    <button class="submit" type="button">Remove</button>
                </li>
    `;
    bookList.insertAdjacentHTML('afterbegin', html)
}

addBtn.addEventListener('click', () => {
    const author = authorInput.value
    const title = titleInput.value
    let book;

    if (!author || !title) return;

    book = new Book(title, author)
    renderBook(book)
    books.push(book)
    console.log(books)

    authorInput.value = titleInput.value = ''
})

