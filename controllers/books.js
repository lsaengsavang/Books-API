const express = require('express')
const books = express()
const Book = require('../models/books.js')

books.get('/', (req, res) => {
    console.log("Index route a success!")
    Book.find()
        .then((foundBooks) => {
            res.json(foundBooks)
        })
        .catch((err) => {
            console.error(err)
            res.status(400).json(`${err}`)
        })
})

books.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
    },
    {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
    },
    {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
    },
    {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
    }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

books.get('/new', (req, res) => {
    res.json('new route');
})

books.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then((foundBooks) => {
            res.json(foundBooks)
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json(`${err}`)
        })
})

books.post('/', (req, res) => {
    Book.create(req.body)
        .then((createdBook) => {
            res.json(createdBook)
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json(`${err}`)
        })
})

books.get('/:id/edit', (req, res) => {
    res.json('Edit Route')
})

books.put('/:id', (req, res) => {
    res.json('Update Route')
})

books.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then((deletedBook) => {
            res.json({
                message: `${deletedBook.title} deleted from library`
            });
        })
        .catch((err) => {
            console.error(err)
            res.status(400).json(`${err}`)
        })
})

module.exports = books