const mongoose = require('mongoose')
const { Schema } = mongoose 

const booksSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String },
    year: { type: Number },
    quantity: { type: Number },
    imageURL: { type: String }
})

const Book = mongoose.model('Book', booksSchema)
module.exports = Book