const http = require('http');

const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-type' : 'text/plain'})
    res.end('Hello from node js');
});

server.listen(3000, () => {
    console.log('Server is running at adress of http://localhost:3000/')
});
