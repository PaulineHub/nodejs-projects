//transferer products.json dans la database

require('dotenv').config()

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        //enlever les produits potentiellement presents dans la DB
        await Product.deleteMany();
        //creer les produits
        await Product.create(jsonProducts)
        console.log('success !!!')
        //sortir du process une fois le transfert reussi
        //The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code. 0=success, 1=failure
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

start();