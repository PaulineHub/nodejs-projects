const express = require('express');
const app = express();
//const morgan = require('morgan')
const logger = require('./logger');
const authorize = require('./authorize');

//1.use vs route
//2. options - our own /express / third party morgan 
//Morgan : a installer, lire doc pour tiny

//express.static(root, [options])
//This is a built-in middleware function in Express. It serves static files and is based on serve-static. When a file is not found, instead of sending a 404 response, it instead calls next() to move on to the next middleware, allowing for stacking and fall-backs.

// app.use([logger,authorize]);
//app.use(express.static('./public'))
//app.use(morgan('tiny'))

app.get('/', (req,res) => {
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/api/products', (req, res) => {
    res.send('Products')
})

app.get('/api/items', [logger, authorize], (req, res) => {
    console.log(req.user)
    res.send('Items')
})

app.listen(5000, ()=>{
    console.log('Server is listening port 5000');
})