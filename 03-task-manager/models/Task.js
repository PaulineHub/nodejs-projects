const mongoose = require('mongoose');

//set structure of documents in our collection

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
        maxlength:[20, 'name can not be more than 20 characters']
    },
    completed:{
        type:Boolean,
        default:false
    }
})

//La méthode trim() permet de retirer les blancs en début et fin de chaîne.

module.exports = mongoose.model('Task', TaskSchema)
//When you call mongoose.model() on a schema, Mongoose compiles a model for you.