// dummy server / test server
const express = require('express')

const app = express()
const expressLayaouts = require('express-ejs-layouts')

//EJS
app.use(expressLayaouts);
app.set('view engine' , 'ejs')

//Routes
app.use('/',require('./routes/index.js'))
app.use('/users',require('./routes/users.js'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server Started on port ${PORT}`)) //run the server
