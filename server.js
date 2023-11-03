// DEPENDENCIES

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB:', process.env.MONGO_URI)
    })
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
})

// INDEX
app.get('/', (req, res) => {
    res.send('Hello world:)')
    res.json({msg: 'This is CORS-enabled for all origins'})
})

// BOOKS
const booksController = require('./controllers/books')
app.use('/books', booksController)


// 404 PAGE
app.get ('*', (req, res) => {
    res.send('404')
})

// LISTEN
app.listen(3000, function() { 
    console.log(`Server is running! http://localhost:${PORT}`)
})