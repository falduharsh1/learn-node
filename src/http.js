const http = require('http')
const url = require('url')

const server = http.createServer(function (req,res){
    console.log(req.method);
    console.log(req.headers);
    console.log(req.url);
    console.log(url.parse(req.url,true).query.id);
    
    res.writeHead(200,{'content-type' : 'text/html'})
    res.write('hello node')
    res.end()

}).listen(8080);