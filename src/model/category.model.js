const mongoose = require('mongoose');
require('dotenv').config();
const db = require('../db/connectDB');  

const categorySchema = new mongoose.Schema({
    owner:{
        type: mongoose.mongo.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: 'None',
        
    }
});

const CategoryModel = db.model('Category', categorySchema);
module.exports = CategoryModel;