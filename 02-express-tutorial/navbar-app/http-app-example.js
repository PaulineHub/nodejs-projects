//Codes de reponse HTTP
// Les réponses informatives (100 - 199),
// Les réponses de succès (200 - 299),
// Les redirections (300 - 399),
// Les erreurs du client (400 - 499),
// Les erreurs du serveur (500 - 599).

//5000 : port
// content-type : type de contenu renvoye

const http = require('http');
const {readFileSync} = require('fs');

//get all files
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');

const server = http.createServer((req, res)=>{
    //console.log(req.method) //return GET
    //console.log(req.url);//return url renseigne ds browser

    //home page
    const url = req.url;
    if(url === '/'){
        res.writeHead(200,{'content-type':'text/html'});
        res.write(homePage)
        res.end()
    } 
    //about page
    else if(url === '/about'){
        res.writeHead(200,{'content-type':'text/html'});
        res.write('<h1>about page</h1>')
        res.end()
    }
    //styles
    else if(url === '/styles.css'){
        res.writeHead(200,{'content-type':'text/css'});
        res.write(homeStyles)
        res.end()
    }
    //image
    else if(url === '/logo.svg'){
        res.writeHead(200,{'content-type':'image/svg+xml'});
        res.write(homeImage)
        res.end()
    }
    //js
    else if(url === '/browser-app.js'){
        res.writeHead(200,{'content-type':'text/javascript'});
        res.write(homeLogic)
        res.end()
    }
    // 404
    else{
        res.writeHead(404,{'content-type':'text/html'});
        res.write('<h1>error page</h1>')
        res.end()
    }
    
})

server.listen(5000)

//installer express
// npm install express --save