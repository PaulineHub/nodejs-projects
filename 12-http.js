const http = require('http');

//http.createServer([options][, requestListener]) : Returns a new instance of http.Server.

//response.write(chunk[, encoding][, callback]) : The first time response.write() is called, it will send the buffered header information and the first chunk of the body to the client. The second time response.write() is called, Node.js assumes data will be streamed, and sends the new data separately. That is, the response is buffered up to the first chunk of the body.

//response.end([data[, encoding]][, callback]) : This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.

const server = http.createServer((req,res) => {
   if(req.url === '/'){
    res.end('Welcome to our page')
   }
   else if(req.url === '/about'){
    res.end('Here is our short history')
   }else{
    res.end(`
    <h1>Oops</h1>
    <p>Don't find the page looking for</p>
    <a href="/">back home</a>
    `);
}
    
})

server.listen(5000)