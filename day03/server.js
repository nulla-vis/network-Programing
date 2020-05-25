//Varibles============================================================================
const http = require('http'); //to add http module
const hostname = '127.0.0.1';
const port = (3000);
const fs = require('fs');// to add file system module
var path = require ('path');//to add path module
//=====================================================================================

//Main=================================================================================
const server = http.createServer((req,res)=>{
    var filePath = data(req).filepath //call the specific value within object
    var contenType = data(req).contentype //call the specific value within object
    fs.readFile(filePath,'utf-8',(err,data)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',contenType);
        if(err){
            errorFound(err,res)
        }
        res.end(data)
        });
})
server.listen(port, hostname, ()=>{
    console.log(`Server Running at http://${hostname} : ${port}/`);
});
//======================================================================================


//function(s)===========================================================================
function data(req) {
    var filepath;
    var contentype;
    var ext = path.extname(req.url).replace('.',''); //the extension is .html/.css/.jss, delete the . (dot)
    if(req.url === '/') { //at first access
        filepath = 'public/html/index.html'
        contentype = 'text/html'
    }else if(req.url.search('public') != -1) { //if accessing other file within public folder
        filepath = req.url.substring(1)
        contentype = 'text/'+ ext
    }else if(ext === "js"){ //if the file extension is .js
        filepath = 'public'+req.url
        contentype = 'text/'+ ext
    }else if(ext === "css") {
        filepath = 'public' + req.url
        contentype = 'text/'+ ext
    }else {
        filepath = 'public/html'+ req.url
        contentype = 'text/' + ext
    }
    return {filepath : filepath, contentype : contentype} //return file as object
}

function errorFound(err,res) {
    switch(err.code){
        case 'ENOENT' :
            res.statusCode = 404;
            res.end(err.message);//send the detailed error message
            break;
        default:
            res.statusCode = 500;
            res.end(err.message);//send the detailed error message
    }
}
//======================================================================================
