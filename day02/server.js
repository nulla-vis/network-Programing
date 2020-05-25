const http = require('http');
const hostname = '127.0.0.1';
const port = (3000);
const urlParser = require('url');
const fs = require('fs');



const server = http.createServer((req,res)=>{
    console.log(req.url);
    var url = urlParser.parse(req.url);
        if(req.url ==='/'){
            fs.readFile(`public/html/index.html`,'utf-8',(err,data)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                if(err){
                    res.statusCode = 404;
                    res.end("file not found") ;
                }
                else res.end(data);
            });
        }else if(req.url === "/css/style.css"){
            fs.readFile('./public/css/style.css','utf-8',(err,data)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','text/css');
                if(err){
                    res.statusCode = 404;
                    res.end("file not found") ;
                }
                else res.end(data);
            });
            //image
        }else if(req.url.indexOf('assets') != -1){
            fs.readFile(`./public/${req.url}`,(err,data)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','image/jpeg');
                if(err){
                    res.statusCode = 404;
                    res.end("file not found") ;
                }
                else res.end(data);
            });
        }
        else{
            fs.readFile(`public/html/${req.url}`,'utf-8',(err,data)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                if(err){
                    res.statusCode = 404;
                    res.end("file not found") ;
                }
                else res.end(data);
            });
        }

    
});

server.listen(port, hostname, ()=>{
    console.log(`Server Running at http://${hostname} : ${port}/`);
});
