const express = require('express');
const router = express.Router();

// ROUTER
// On ecrit les routes URL et quelle variables du controller on appelle sur ces routes selon les methodes (get post patch, delete)

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)


module.exports = router