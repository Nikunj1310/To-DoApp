const { create } = require('../model/user.model');
const TaskService = require('../services/task.services');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const createTaskSchema = joi.object({
    owner: joi.objectId().required(),
    category: joi.objectId().required(),
    title: joi.string().required(),
    description: joi.string().optional(),
    DeadLine: joi.date().optional(),
    createdAt: joi.date().required(),
});

const getTasksSchema = joi.object({
    owner: joi.objectId().required(),
    category: joi.objectId().required()
})

const updateTaskSchema = joi.object({
    owner: joi.objectId().required(),
    id: joi.objectId().required(),
    category: joi.objectId().optional(),
    isCompleted: joi.boolean().optional(),
    title: joi.string().optional(),
    description: joi.string().optional(),
    DeadLine: joi.date().optional(),
    createdAt: joi.date().optional()
})

const deleteTaskSchema = joi.object({
    id: joi.objectId().required(),
    owner: joi.objectId().required()
})

exports.createTask = async (req, res, next) => {
    try{
        const {error} = createTaskSchema.validate(req.body);
        if(error){
            res.status(500).json({message:error.details[0].message});
            return;
        }
        const { owner, category, title, description, DeadLine, createdAt } = req.body;
        const task = await TaskService.createTask(owner, category, title, description, createdAt, DeadLine);
        res.status(201).json({
            message: "Task created successfully",
            task: {
                id: task._id,
                owner: task.owner,
                category: task.category,
                title: task.title,
                description: task.description,
                DeadLine: task.DeadLine,
                status: task.status,
                isCompleted: task.isCompleted,
                createdAt: task.createdAt
            }
        });
    }catch(err){
        res.status(500).json({message: err.message});
        throw err;
    }
}

exports.getTasks = async (req, res, next) => {
    try{
        const {error} = getTasksSchema.validate(req.body);
        if(error){
            res.status(500).json({message: error.details[0].message});
            return;
        }
        const {owner, category} = req.body;
        const tasks = await TaskService.getTasks(owner,category);
        res.status(201).json({
            message: "Tasks fetched successfully",
            tasks: tasks.map(task => ({
                id: task._id,
                owner: task.owner,
                category: task.category,
                title: task.title,
                description: task.description,
                DeadLine: task.DeadLine,
                status: task.status,
                isCompleted: task.isCompleted,
                createdAt: task.createdAt
            }))
        })
    }catch(err){
        res.status(500).json({message: err.message});
        throw err;
    }
}

exports.updateTask = async (req,res,next)=>{
    try{
        const {error} = updateTaskSchema.validate(req.body);
        if(error){
            res.status(500).json({message: error.details[0].message});
            return;
        }

        const {owner, id, title, description, DeadLine, isCompleted, category, createdAt} = req.body;

        const newTask = await TaskService.updateTask(owner, id, title, description, DeadLine, isCompleted, category, createdAt);
        res.status(201).json({
            message: "Task updated successfully",
            task: {
                id: newTask._id,
                owner: newTask.owner,
                category: newTask.category,
                title: newTask.title,
                description: newTask.description,
                DeadLine: newTask.DeadLine,
                status: newTask.status,
                isCompleted: newTask.isCompleted,
                createdAt: newTask.createdAt
            }
        })
    }catch(err){
        res.status(500).json({message: err.message});
        throw err;
    }
}

exports.deleteTask = async (req,res,next)=>{
    try{
        const {error} = deleteTaskSchema.validate(req.body);
        if(error){
            res.status(500).json({message: err.details[0].message});
            return;
        }
        const {id, owner} = req.body;
        const response  = await TaskService.deleteTask(owner, id);
        res.status(201).json({
            message: response.message
        })
    }catch(err){
        res.status(500).json({message: err.message});
        throw err;
    }
}

exports.deleteAllTasksOfCategory = async (req, res, next) => {
  try {
    const { owner, category } = req.body;
    if (!owner || !category) {
      return res.status(400).json({ message: 'Owner and category are required' });
    }
    const response = await taskService.deleteAllTasksOfCategory(owner, category);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw err;
  }
};
