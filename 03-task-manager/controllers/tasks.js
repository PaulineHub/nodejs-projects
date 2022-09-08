const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

// CONTROLLER
// Controls witch method of the model (from mongoose) is used for each action 

// TRY AND CATCH
// sans try and catch, en cas d'erreur on reste en attente indefiniment
//ici, on stocke cette mecanique dans asyncWrapper()

// MONGOOSE MODELS
// Mongoose models provide several static helper functions for CRUD operations. Each of these functions returns a mongoose Query object. ex : Model.create(param)

/** GET ALL TASK
 * Note : 
 * Model.find() finds documents
 * Model.find({}) find all documents
 * */ 
const getAllTasks = asyncWrapper( async (req,res) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})// comme {task:task}, raccourci grace a ES6
        //res.status(200).json({status:"success",data:{tasks}})
        //res.status(200).json({tasks,amount:tasks.length})
})

/** CREATE A TASK
 * Note : 
 * - la methode .create() creer un document (instance du modele Task)
 * - on utilise le mot cle async devant la fonction car on utilise await a l'interieur
 * */ 
const createTask = asyncWrapper(async (req,res) => {
        const task = await Task.create(req.body)
        res.status(201).json({task}) // 201 ; succesfull POST request
})

/** GET ONE TASK
 * Note : Model.findOne()
 */
const getTask = asyncWrapper(async (req,res,next) => {
        const {id:taskID} = await req.params;
        const task = await Task.findOne({_id:taskID}); // _id cree par Mondo DB
        if(!task) {
            //erreur si l'id n'existe pas
            return next(createCustomError(`No task with id : ${taskID}`,404))
        }
        res.status(200).json({task})
})

/** DELETE A TASK
 * Note : Model.findOneAndDelete()
 */
const deleteTask = asyncWrapper(async (req,res,next)=>{
        const {id:taskID} = await req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return next(createCustomError(`No task with id : ${taskID}`,404))
        }
        res.status(200).json({task})
})

/** UPDATE A TASK
 * Notes : 
 * Model.findOneAndUpdate()
 * {new:true,runValidators:true} permet d'afficher dans la reponse la task modifiee, sinon l'ancienne tache apparait, meme si la tache est bein modifiee dans getAllTasks
 */
const updateTask = asyncWrapper(async (req,res,next)=>{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body, {new:true,runValidators:true});
        if(!task){
            return next(createCustomError(`No task with id : ${taskID}`,404))
        }
        res.status(200).json({task})
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}