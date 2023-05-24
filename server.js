const http = require ('http'); 
const querystring = require('querystring'); 

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        console.log ('Greet successful. Now implement response'); 
        
    }
    else {
        res.writeHead(404); 
        res.end('Not Found'); 
    }
}); 

    server.listen(3000, () => {
        console.log('Server listening on http://localhost:3000/');
    })