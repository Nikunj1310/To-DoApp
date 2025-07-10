require('dotenv').config();

const mongoose = require('mongoose');

    

const connection = mongoose.createConnection(process.env.MONGODB_URI)
    .on('open', () => {
        console.log(`Connected to mongo database on ${process.env.MONGODB_URI}`);
    })
    .on('error', (err) => {
        console.log(`Encountered an error ${err}`);
    });
module.exports = connection;