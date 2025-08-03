const router = require('express').Router();
const taskController = require('../controller/task.controller');

router.post('/createTask',taskController.createTask);
router.post('/getTask', taskController.getTasks);
router.put('/updateTask', taskController.updateTask);
router.delete('/deleteTask', taskController.deleteAllTasksOfCategory);

module.exports = router;