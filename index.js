// array to store books
const myLibrary = [];

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

addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);

// Example testing the toggle method:
console.log(myLibrary[0].read); // false
myLibrary[0].toggleReadStatus();
console.log(myLibrary[0].read); // true