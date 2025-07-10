const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../db/connectDB');
const { string, required } = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function () {
    try {
        let user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password, salt);

        user.password = hashpass;
        
    } catch(err) {
        throw err;
    }
})

const userModel = db.model('user', userSchema);

module.exports = userModel;