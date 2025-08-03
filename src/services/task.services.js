const { createRef } = require('react');
const taskModel = require('../model/task.model');

class TaskService {
    static async createTask(owner, category, title, description, createdAt,dueDate) {
        try {
            const task = new taskModel({
                owner: owner,
                category: category,
                title: title,
                createdAt: createdAt,
                description: description,
                DeadLine: dueDate
            });
            await task.save();
            return task;
        } catch (err) {
            throw new Error(err);
        }
    }
    static async getTasks(owner, category, createdAt) {
        try {
            const tasks = await taskModel.find({ owner: owner, category: category, createdAt: createdAt });
            if (!tasks || tasks.length === 0) {
                throw new Error('No tasks has been created');
                return;
            }
            const currentDate = new Date();
            for (const task of tasks) {
                if (currentDate > task.DeadLine && !task.isCompleted) {
                    task.status = 'MissedDealiine';
                    await task.save();
                }
            }
            return tasks;
        } catch (err) {
            throw err;
        }
    }
    static async updateTask(owner, taskID, title, description, DeadLine, isCompleted, category, createdAt) {
        try {
            if (!taskID || !owner) { throw new Error('Required IDs are missing'); }
            const task = await taskModel.findOne({ _id: taskID, owner: owner });
            if (!task) { throw new Error('Task not found'); }

            if (title) {
                task.title = title;
            }
            if (description) {
                task.description = description;
            }
            if (category) {
                task.category = category;
            }
            if (DeadLine) {
                task.DeadLine = DeadLine;
            }
            if(createdAt) {
                task.createdAt = createdAt;
            }

            if (isCompleted) {
                const now = new Date();
                task.isCompleted = isCompleted;
                task.status = now <= task.DeadLine ? 'CompletedOnTime' : 'CompletedLate';
            }
            return await task.save();
            
        } catch (err) {
            throw new Error(err);
        }

    }

    static async deleteTask(owner, taskID){
        try{
            if(!taskID || !owner){ throw new Error('Required IDs are missing'); }
            const task = await taskModel.findOneAndDelete({ _id: taskID, owner: owner });
            if(!task){ throw new Error('Task not found'); return; }
            return { message: 'Task deleted successfully' };
        }catch(err){
            throw err;
        }
    }

    static async deleteAllTasksOfCategory(owner, category) {
        try {
            const result = await taskModel.deleteMany({ owner: owner, category: category });
            return { message: `${result.deletedCount} tasks deleted successfully` };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = TaskService;