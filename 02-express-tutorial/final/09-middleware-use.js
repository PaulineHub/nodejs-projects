const express = require('express');
const app = express();
const logger = require('./logger');
const authorize = require('./authorize');

//ORDRE IMPORTANT !! Si app.use vient apres app.get('/about'...), ne sera appele qu'a partir de app.get('api/products',...)
//Pour charger la fonction middleware, appelez app.use() en spécifiant la fonction middleware. 
//app.use([path,] callback [, callback...])

// app.use('/api',logger);
//ne va s'appliquer qu'aux path commencant par /api

app.use([logger,authorize]);
//vont etre executes dans l'ordre

app.get('/', (req,res) => {
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/api/products', (req, res) => {
    res.send('Products')
})

app.get('/api/items', (req, res) => {
    console.log(req.user)
    res.send('Items')
})

app.listen(5000, ()=>{
    console.log('Server is listening port 5000');
})