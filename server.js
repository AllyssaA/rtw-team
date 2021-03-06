/*
https://socket.io/get-started/chat
*/

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 4242

// Template files
app.set('views', 'views');

// app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve('static')))


// index route
app.get('/', (req, res) => {
        res.render('index', {
        pageTitle: 'Chat',
    });
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('message', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

http.listen(port, () => {
    console.log('listening on port ', port)
})
