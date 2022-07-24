// BASE VARIABLES
let library = [];
const adderButton = document.querySelector('#adderButton');
const adderForm = document.querySelector('#adderForm');
const submitBook = document.querySelector('#submitBook');
const bookListItems = document.querySelector('#bookListItems');
const cancelBtn = document.querySelector('#cancelButton');
// BOOK OBJECT CONSTRUCTOR
function Book(title, author, pages, read) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
}
// SHOW FORM
adderButton.addEventListener('click', () => {
    adderForm.style.display = 'flex';
});
// RESET AND HIDE FORM
function resetAndHideForm() {
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
    document.querySelector('#book-pages').value = '';
    document.querySelector('#book-read').value = 'not yet';
    adderForm.style.display = 'none';
};
cancelBtn.addEventListener('click', resetAndHideForm);
// ADD BOOK TO LIBRARY ARRAY + RESET & HIDE FORM
submitBook.addEventListener('click', addBookToLibrary);
function addBookToLibrary() {
    let title = document.querySelector('#book-title').value;
    if (document.querySelector('#book-title').value === '') {
        title = 'unknown';
    }
    let author = document.querySelector('#book-author').value;
    if (document.querySelector('#book-author').value === '') {
        author = 'unknown';
    }
    let pages = document.querySelector('#book-pages').value;
    if (document.querySelector('#book-pages').value === '') {
        pages = 'unknown';
    }
    let read = document.querySelector('#book-read').value;
    const bookCreated = new Book(title, author, pages, read);
    library.push(bookCreated);
    resetAndHideForm();
    renderBookList();
}
// RENDER BOOK LIST IN TABLE
function renderBookList() {
    bookListItems.innerHTML = '';
    library.forEach(book => {
        let trBook = bookListItems.insertRow(0);
        let tdTitle = trBook.insertCell(0);
        tdTitle.textContent = book.title;
        let tdAuthor = trBook.insertCell(1);
        tdAuthor.textContent = book.author;
        let tdPages = trBook.insertCell(2);
        tdPages.textContent = book.pages;
        let tdRead = trBook.insertCell(3);
        const readBtn = document.createElement('button');
        readBtn.textContent = book.read;
        tdRead.appendChild(readBtn);
        readBtn.addEventListener('click', () => {
            if (book.read === 'not yet') {
                book.read = 'yes';
            } else {
                book.read = 'not yet';
            }
            renderBookList();
        })
        let tdDelete = trBook.insertCell(4);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-button')
        deleteBtn.setAttribute('id', `${library.indexOf(book)}`);
        tdDelete.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            library.splice(deleteBtn.id, 1);
            renderBookList();
        })
    })
};
// STARTER BOOKS
const theHobbit = new Book('The Hobbit', 'J. R. R. Tolkien', '310', 'not yet');
library.push(theHobbit);
const thinkLikeAProgrammer = new Book('Think Like a Programmer', 'V. Anton Spraul', '256', 'not yet');
library.push(thinkLikeAProgrammer);
const cantHurtMe = new Book('Can\'t Hurt Me', 'David Goggins', '364', 'yes');
library.push(cantHurtMe);
renderBookList();