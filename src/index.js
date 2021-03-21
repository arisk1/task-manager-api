const express = require('express');
require('./db/mongoose');


const app = express();
const port = process.env.PORT;
app.use(express.json());

/***  ENDPOINTS ***/
//users
const usersRouter = require('./routers/users');
app.use(usersRouter);

//tasks
const tasksRouter = require('./routers/tasks');
app.use(tasksRouter);


app.listen(port,()=>{
    console.log("Server is up on port " + port);
});