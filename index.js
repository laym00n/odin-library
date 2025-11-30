// array to store books
let myLibrary = [];

// constructor for creating books
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// add book objects to myLibrary
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}
    
// manage read status using prototype
Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

// remove a book
function removeBook(bookId) {
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    displayBooks();
}

// helper global togglereadstatus function to handle button click
function toggleReadStatus(bookId) {
    const bookToToggle = myLibrary.find(book => book.id === bookId)

    // if book obj found
    if (bookToToggle) {
        bookToToggle.toggleReadStatus();
    }

    displayBooks();
}

addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);

// dom references
const bookCards = document.querySelector('.book-cards');
const newBookBtn = document.querySelector('#new-book-btn');
const bookDialog = document.querySelector('#form-dialog');
const newBookForm = document.querySelector('#new-book-form');
const closeDialogBtn = document.querySelector('#close-dialog-btn');

// to display the book objects to webpage
function displayBooks() {
    // clear exisitng content
    bookCards.innerHTML = '';

    // loop through the myLibrary
    myLibrary.forEach (book => {
        // create html elements for the book object
        const bookCard = document.createElement('div');
        const titlePara = document.createElement('p');
        const authorPara = document.createElement('p');
        const pagesPara = document.createElement('p');
        const readStatusPara = document.createElement('p');
        const buttonRemove = document.createElement('button');
        const buttonToggleReadStatus = document.createElement('button');

        // apply class and data-id attribute
        bookCard.setAttribute('data-book-id', book.id);
        bookCard.classList.add('book-card');
        
        // content insertion
        titlePara.textContent = `Title: ${book.title}`;
        authorPara.textContent = `Author: ${book.author}`;
        pagesPara.textContent = `Pages: ${book.pages}`;
        buttonRemove.textContent = `Remove`;
        buttonToggleReadStatus.textContent = `Toggle Read`;

        // for read status
        readStatusPara.textContent = book.read ? 'Read' : 'Not Read Yet';

        // Event Listener
        buttonRemove.addEventListener('click', () => {
            removeBook(book.id);
        })

        buttonToggleReadStatus.addEventListener('click', () => {
            toggleReadStatus(book.id);
        })

        // build structure and help with child parent relationship
        bookCard.appendChild(titlePara);
        bookCard.appendChild(authorPara);
        bookCard.appendChild(pagesPara);
        bookCard.appendChild(readStatusPara);
        bookCard.appendChild(buttonRemove);
        bookCard.appendChild(buttonToggleReadStatus);

        // append our card to container
        bookCards.appendChild(bookCard);
    });

}
displayBooks();

// show dialog for 'add new book' button
newBookBtn.addEventListener('click', () => {
    bookDialog.showModal();
});

// close dialog for 'close' button
closeDialogBtn.addEventListener('click', () => {
    bookDialog.close();
});

// when new book data is submitted through form
newBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //grab all the inputs to the form using FOrmData()
    const formData = new FormData(newBookForm);

    const title = formData.get('title');
    const author = formData.get('author');
    const pages = parseInt(formData.get('pages'));
    const read = !!formData.get('read');

    // update data model (myLibrary) and view
    addBookToLibrary(title, author, pages, read);
    displayBooks();

    newBookForm.reset();
    bookDialog.close();
})