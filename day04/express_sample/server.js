const express = require('express');
const app = express();
const fs = require('fs')


app.use(express.static(__dirname + '/public'));

app.get('/user/:id', (req,res)=>{
    fs.readFile(__dirname+'/public/user.html','utf-8',(err,data)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        var array = data.split("Default User")
        if(err) res.end("404 : file not found")
        else res.end(array.join(req.params.id));
    });
})
// app.get('/',(req,res) => {
//     res.send('Hello, World! express')
// })

// app.get('/azu/', (req,res)=>{
//     res.send('Azhandi Usemahu')
// })
app.listen(3000, ()=>console.log('Example app listen on port 3000'))//aa