const mongoose = require('mongoose');

// MODEL
//set structure of the data we want to stock (= schema) in our collection of datas in Mongo DB

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'], // prevent empty string
        trim:true, // removes spaces at the begining and the end of the string
        maxlength:[20, 'name can not be more than 20 characters']
    },
    completed:{
        type:Boolean,
        default:false
    }
})

//La méthode trim() permet de retirer les blancs en début et fin de chaîne.

module.exports = mongoose.model('Task', TaskSchema) // params: name of the schema and the schema
//When you call mongoose.model() on a schema, Mongoose compiles a model for you.