const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(cors())
app.options('*', cors())

const db_link = 'mongodb+srv://ufa:ufa@test-vjpn7.gcp.mongodb.net/ufa?retryWrites=true'
const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect(db_link, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('connected')
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.use((req, res) => {
    res.status(404).send({
        success: false,
        message: 'Route not found',
    })
})

app.use((err, req, res) => {
    const message = err.message || err
    res.send({
        success: false,
        message,
    })
})

module.exports = app
