//this is server side
const { Socket } = require('dgram')
var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)//(http)->determine which server wanna to use socket.io
var port = 3000
var arrayUser = []
var arrayId = []
app.get('/', (req,res) => {
    res.sendfile(__dirname + '/index.html')
})

app.get('/socket.js', (req,res) => {
    res.sendfile(__dirname + '/socket.js')
})

http.listen(3000, () => {
    console.log(`listen on *: ${port}`)
})

io.on('connection' , (socket) => {
    // socket.broadcast.emit('message','a User has connected');
    socket.on('send-UserName',(userName) => {
        socket.broadcast.emit('send-UserName',`${userName} has joined the chat`);
        arrayUser.push(userName)
        arrayId.push(socket.id)
        console.log(arrayUser)
        io.emit('online',arrayUser)
       
    });

    socket.on('disconnect', () =>  {
        // socket.broadcast.emit('message','a User has Disconnected');
        var dcUserIndex = arrayId.indexOf(socket.id)
        var dcUser = arrayUser[dcUserIndex]
        arrayId.splice(dcUserIndex,1)
        arrayUser.splice(dcUserIndex,1)
        console.log('after dc ' + arrayUser)
        socket.broadcast.emit('offline',dcUser,arrayUser)
    })
    
    socket.on('message', (userName,msg)=>{
        // console.log(msg)
        io.emit('message',`${userName} : ${msg}`);
        
         //io is server and every user
        // socket.emit('message',`${userName} : ${msg}`);
        // socket.broadcast.emit('message',`${userName} : ${msg}`);
    })

    socket.on('typing',(userName)=>{
        socket.broadcast.emit('typing',userName)
    })
    
})