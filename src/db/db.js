const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1:27017/books";

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
// .then(() => console.log("Connected to mongodb"))
.catch(() => console.log(e));
