const express = require('express');
const body_parser = require('body-parser');
const userRoute = require('./routers/user.router')

const app = express();

app.use(body_parser.json())
app.use('/',userRoute);

module.exports = app;