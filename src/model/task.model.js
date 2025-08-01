const mongoose = require('mongoose');
const db = require('../db/connectDB');
const { required } = require('joi');

const taskSchema = new mongoose.Schema({
    owner:{
        type:mongoose.mongo.ObjectId,
        ref: 'User',
        required: true
    },
    category:{
        type: mongoose.mongo.ObjectId,
        ref: 'Category',
        required: true
    },
    status:{
        type: String,
        enum: ['Pending','MissedDealiine', 'CompletedOnTime','CompletedLate'],
        default: 'Pending'
    },
    isCompleted:{
        type: Boolean,
        default: false,
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type:String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    DeadLine:{
        type:Date,
    }
})

const TaskModel = db.model('Task',taskSchema);
module.exports = TaskModel;