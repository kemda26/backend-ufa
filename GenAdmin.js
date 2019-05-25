const [nodeCommand, fileName, username, password] = process.argv
const { hashText } = require('./helpers/bcrypt')
const { Users } = require('./models')

const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect('mongodb+srv://ufa:ufa@test-vjpn7.gcp.mongodb.net/ufa?retryWrites=true', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// const hash = hashText(password)
const user = new Users({
    username,
    password: password,
    type: 'admin'
})

user.save().then(ok => console.log(ok)).catch(err => console.log(err))
