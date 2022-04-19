/*
https://socket.io/get-started/chat
*/

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 4242

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Template files
app.set('views', 'views');


// app.use(express.static(path.resolve('public')))


// index route
app.get('/', (req, res) => {
        res.render('index', {
        pageTitle: 'ik werk',
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

// const server = app.listen(app.get("port"), function () {
//     console.log(`Server app started on port : ${app.get("port")}`);
//   });