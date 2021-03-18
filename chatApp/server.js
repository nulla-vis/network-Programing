
//サーバ起動 : npm run dev

//back-end js
const path = require('path')
const http = require('http')
const express = require('express')
const expressLayaouts = require('express-ejs-layouts')
const socketio = require('socket.io')
const formatMessage = require('./utility/messages')
const {userJoin, getCurrentuser, userLeave, usersRoom} = require('./utility/users')
const { Socket } = require('dgram')
const { emit } = require('process')
const { ensureAuthenticated } = require('./config/auth')

const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const { error } = require('console')
const passport = require('passport')

const PORT = 3000 || process.env.PORT //check if we have environtment named PORT, if not using the 3000
const app = express()
const server = http.createServer(app)
const io = socketio(server)

//passport config
require('./config/passport')(passport)

//DB Config
const db = require('./config/keys').MongoURI

//Connect to Mongo
mongoose.connect(db, {useUnifiedTopology: true,useNewUrlParser: true })
.then(()=> console.log("MongoDB Connected..."))
.catch(err => console.log(err))

//EJS
app.use(expressLayaouts);
app.set('view engine', 'ejs')

//Bodyparser
app.use(express.urlencoded({extended: false}))

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash())

//Global var
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})
//set Static folder============================================
// app.use(express.static(path.join(__dirname, 'routes')))
app.use('/static',express.static(path.join(__dirname, 'public')))

 

//Routes
app.use('/',require('./routes/index.js'))
app.use('/users',require('./routes/users.js'))
// app.use()
const botName = 'Chat BOT'
//run when user connect========================================
io.on('connection',socket=>{
    socket.on('joinRoom',({username,room})=> {

    const user = userJoin(socket.id, username,room)

    socket.join(user.room)

    //single client
    //welcome a new user
    socket.emit('message',formatMessage(botName,'Welcome to Chat!'))

    //Broadcast when user connect===============================
    //everybody except the connected user
    socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.userName} joined the chat, say hello!`))

    //send online user and room name
    io.to(user.room).emit('userRoom', {
        room : user.room,
        users : usersRoom(user.room)
    })
})


    //to all client
    // io.emit()

    //when recieve chat message
    socket.on('chatMessage',msg=>{
        // console.log(msg)
        const user = getCurrentuser(socket.id)
        io.to(user.room).emit('message',formatMessage(user.userName,msg))
    })

    //istyping. . .
    socket.on('typing', data=> {
        const user = getCurrentuser(socket.id)
        socket.broadcast.emit('typing',formatMessage(user.userName)) 
    })

    //when client disconnected
    socket.on('disconnect',()=>{
        const user = userLeave(socket.id)

        if(user) {
            io.to(user.room).emit('message',formatMessage(botName,`${user.userName} has left the chat`))

            //send online user and room name
            io.to(user.room).emit('userRoom', {
            room : user.room,
             users : usersRoom(user.room)
            })
        }
    })
}) 



server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})