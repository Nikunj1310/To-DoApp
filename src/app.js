const express = require('express');
const body_parser = require('body-parser');
const userRoute = require('./routers/user.router')
const categoryRoute = require('./routers/category.router');
const taskRoute = require('./routers/task.router');

const app = express();

app.use(body_parser.json())
app.use('/',userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/task',taskRoute);

module.exports = app;