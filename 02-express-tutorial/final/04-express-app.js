const express = require('express');
const path = require('path');

const app = express();

//setup static ans middleware

//app.use([path,] callback [, callback...])
//Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.

//express.static(root, [options])
//This is a built-in middleware function in Express. It serves static files and is based on serve-static. Permet de ne pas faire les liens manuellement pour aller chercher chaque fichier et les envoyer en res vers le browser.

app.use(express.static('./public'))

//The path.resolve() method resolves a sequence of paths or path segments into an absolute path.

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})

app.all('*', (req,res)=>{
    res.status(404).send('resource not found')
})

app.listen(5000, ()=>{
    console.log('server is listening on port 5000....');
})