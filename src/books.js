const fs = require("fs");
const chalk = require("chalk");
const Book = require("./db/models/book");
const mongoose = require("mongoose");

const showStoreDB = async (name) => {
    try {
        // Show all the books
        if(!name){
            const books = await Book.find({});
            if(books.length > 0){
                console.log(`Books in store: ${chalk.red(books.length)}`);
                books.forEach(book => console.log(`${chalk.blue(book.name)}`));
            } else {
                console.log(chalk.red("No books to show!"));
            }
        } else { // if name is given
            const book = await Book.findOne({name});
            if(!book){
                console.log(`${chalk.red.inverse(name)}, no such book to show!`);
            } else {
                console.log(`${chalk.green.inverse(name)} found!`);
            }
        }
    } catch (e) {
        console.log(chalk.red.inverse("DB ERROR!"));
    }
    mongoose.connection.close();
}

const addBookDB = async (name, author) => {
    try {
        const isPresent = await Book.findOne({name});
        if(!isPresent){
            const book = Book({name, author});
                await book.save();
                console.log(chalk.green("New book added!"));
        } else {
            console.log(chalk.green("Book already exist!"))
        }
    } catch (e) {
        console.log(chalk.red.inverse("Something's wrong while inserting to the DB"));
    }
    mongoose.connection.close();
}

const removeBookDB = async (name) => {
    try {
        const book = await Book.findOne({name});
        if(book){
            await book.remove();
            console.log(`${chalk.red.inverse(name)} removed from store!`);
        } else {
            console.log(chalk.red(`${chalk.red.inverse(name)}, no such book in store!`));
        }
    } catch (e) {
        console.log(chalk.red.inverse("Something's wrong while deleting!"));
    }
    mongoose.connection.close();
}

const loadBooks = () => {
    try{
        const dataBuffer = fs.readFileSync("books.json");
        const data = dataBuffer.toString();
        return JSON.parse(data);  
    } catch (e) {
        return [];
    }
}

const addBook = (name, author) => {
    const books = loadBooks();

    const duplicateBook = books.find((book) => {
        return book.name === name;
    })

    if(!duplicateBook) {
        books.push({
            name: name,
            author: author
        });
        saveBooks(books);
        console.log(chalk.green("New book added!"))
    } else {
        console.log(chalk.red("Book already exist!"))
    }
}

const removeBook = (name) => {
    const books = loadBooks();

    const bookRemoved = books.filter((book) => {
        return book.name !== name
    });

    if(bookRemoved.length === books.length) {
        console.log(chalk.red(`${chalk.red.inverse(name)}, no such book in store!`));
    } else {
        saveBooks(bookRemoved);
        console.log(chalk.green(`${chalk.green.inverse(name)} removed from store!`))
    }
}

const saveBooks = (books) => {
    fs.writeFileSync("books.json", JSON.stringify(books));
}

const showStore = (name) => {
    const books = loadBooks();
    
    if(!name){
        if(books.length > 0){
            console.log(`Books in store: ${chalk.red(books.length)}`);
            books.forEach(book => console.log(`${chalk.blue(book.name)}`));
        } else {
            console.log(chalk.red("No books to show!"));
        }
    } else {
        const book = books.find((book) => {
            return book.name === name;
        });

        if(!book){
            console.log(`${chalk.red.inverse(name)}, no such book to show!`);
        } else {
            console.log(`${chalk.green.inverse(name)} found!`);
        }
    }
    
}

module.exports = {
    addBook: addBook,
    removeBook: removeBook,
    showStore: showStore,
    addBookDB: addBookDB,
    removeBookDB: removeBookDB,
    showStoreDB: showStoreDB,
}
