const yargs = require("yargs");
const books = require("./books.js");
require("./db/db");

yargs.command({
    command: "add",
    describe: "Adds a book to the store",
    builder: {
        name: {
            describe: "Title of the book",
            demandOption: true,
            type: "string"
        },
        author: {
            describe: "Author of the book",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        books.addBookDB(argv.name, argv.author);
    }
});

yargs.command({
    command: "remove",
    describe: "Removes a book from the store",
    builder: {
        name: {
            describe: "Title of the book",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        books.removeBookDB(argv.name);
    }
});

yargs.command({
    command: "show",
    describe: "Show book(s) in store",
    builder : {
        name: {
            describe: "Title of the book",
            demandOption: false,
            type: "string"
        }
    },

    handler(argv) {
        books.showStoreDB(argv.name);
    }
});

yargs.command({
    command: "addFile",
    describe: "Adds a book to the store",
    builder: {
        name: {
            describe: "Title of the book",
            demandOption: true,
            type: "string"
        },
        author: {
            describe: "Author of the book",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        books.addBook(argv.name, argv.author);
    }
});

yargs.command({
    command: "removeFile",
    describe: "Removes a book from the store",
    builder: {
        name: {
            describe: "Title of the book",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        books.removeBook(argv.name);
    }
});

yargs.command({
    command: "showFile",
    describe: "Show book(s) in store",
    builder : {
        name: {
            describe: "Title of the book",
            demandOption: false,
            type: "string"
        }
    },

    handler(argv) {
        books.showStore(argv.name);
    }
});

yargs.parse();