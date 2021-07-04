const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

//Model.find() finds documents
//Model.find({}) find all documents
const getAllTasks = asyncWrapper( async (req,res)=>{
        const tasks = await Task.find({})
        //res.status(200).json({tasks})// comme {task:task}, raccourci grace a ES6
        //res.status(200).json({tasks,amount:tasks.length})
        res.status(200).json({status:"success",data:{tasks}})
})

//la methode .create() creer un document (instance du modele Task)
// sans try and catch, en cas d'erreur on reste en attente indefiniment
const createTask = asyncWrapper(async (req,res)=>{
        const task = await Task.create(req.body)
        res.status(201).json({task})
})

const getTask = asyncWrapper(async (req,res,next)=>{
        const {id:taskID} = await req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task){
            //erreur si l'id n'existe pas
            return next(createCustomError(`No task with id : ${taskID}`,404))
        }
        res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req,res,next)=>{
        const {id:taskID} = await req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return next(createCustomError(`No task with id : ${taskID}`,404))
        }
        res.status(200).json({task})
})

//{new:true,runValidators:true} permet d'afficher dans la reponse la task modifiee, sinon l'ancienne tache apparait, meme si la tache est bein modifiee dans getAllTasks
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