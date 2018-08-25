const http = require('http');
const url = require('url');
const fs = require('fs');

const renderHTML = (path, response) => {
    fs.readFile(path, null, (error, data) => {
        if(error) {
            response.writeHead(404);
            response.write('File Not Found');
        } else {
            response.write(data);
            response.end();
        }
    });
}

http.createServer((req, res) => {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    let path = url.parse(req.url).pathname;
    switch(path) {
        case '/':
            renderHTML('./index.html', res);
            break;
        case '/about':
            renderHTML('./about.html', res);
            break;
        default:
            res.writeHead(404);
            res.write('Route Not Defined');
            res.end();
    }
}).listen(8080);