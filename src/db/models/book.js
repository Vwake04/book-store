const mongoose = require("mongoose");

const Book = mongoose.model("Book", {
    name: {
        type: String,
        trim: true,
        required: true
    },

    author: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = Book;