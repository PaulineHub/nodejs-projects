const express = require('express');
const app = express();

// req => middleware => res

//Les fonctions de middleware sont des fonctions qui peuvent accéder à l’objet Request (req), l’objet response (res) et à la fonction middleware suivant dans le cycle demande-réponse de l’application. La fonction middleware suivante est couramment désignée par une variable nommée next.

// URL localhost:5000/about

const logger = (req,res,next) =>{
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);//return GET /about 2021
    next()
}

app.get('/', logger, (req,res) => {
    res.send('Home')
})

app.get('/about', logger, (req, res) => {
    res.send('About')
})

app.listen(5000, ()=>{
    console.log('Server is listening port 5000');
})