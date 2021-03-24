const express = require('express');
require('./db/mongoose');


const app = express();

app.use(express.json());
/***  ENDPOINTS ***/
//users
const usersRouter = require('./routers/users');
app.use(usersRouter);

//tasks
const tasksRouter = require('./routers/tasks');
app.use(tasksRouter);


module.exports = app