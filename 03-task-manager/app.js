
const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');
require('dotenv').config(); // give access to .env file with env variables 
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')

//MIDDLEWARE
//express.static(root, [options])
//This is a built-in middleware function in Express. It serves static files and is based on serve-static.
app.use(express.static('./public'))
//express.json([options])
//Permet de parser les donnees JSON qui nous arrivent du body des requetes en JS
app.use(express.json())

//ROUTES
app.use('/api/v1/tasks',tasks)
//route qui n'existe pas
app.use(notFound)
//route erreur dans la req
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;

//server connection only if connection to DB succeded
const start = async () =>{
    try {
        // connexion to DB MONGO with mongo uri parameter in .env file
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()

