const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  commentcount: { type: Number, required: true },
  comments: [{ type: String, required: true }]
});

const database = mongoose.connection.useDb('books');

const Book = database.model("Book", BookSchema);

exports.Book = Book;