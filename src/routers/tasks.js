const express = require('express');
const mongoose = require('mongoose');
const Task = require("../db/schemas/Task");
const auth = require('../middleware/auth');


const router = new express.Router();

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt_asc
router.get('/tasks',auth ,async (req, res) => {
    const match = {};
    const sort = {};
    if(req.query.completed){
        //convert string provided from req.query.completed to boolean
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    try{
        //alternative way to fetch users 
        // const tasks = await Task.find({ owner : req.user._id});
        
        await req.user.populate({
            path : 'tasks',
            match,
            options : {
                limit : parseInt(req.query.limit) ,
                skip : parseInt(req.query.skip),
                sort //1 ascending | -1 descending
            }
        }).execPopulate();
        res.status(200).send(req.user.tasks);
        
    }catch(e){
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', auth ,async (req, res) => {
    const _id = req.params.id;

    try{
        //make sure the user is trying to fetch his own task 
        const task = await Task.findOne({ _id , owner : req.user._id});
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);
    }catch(e){
        if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
            //handle the invalid IDs
            return res.status(400).send();
        }
        //handle the internal server error
        res.status(500).send(e);
    }
   
});

router.post('/tasks', auth ,async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body, //ES6 way to store all fieds of req.body to task
        owner : req.user._id
    })
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
});

router.patch('/tasks/:id',auth , async (req,res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed' , 'description'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));
    
    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates!'});
    }
    
    try {
        const task = await Task.findOne({_id : req.params.id , owner : req.user._id});
       
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => task[update] = req.param[update]);
        await task.save();

        res.status(200).send(task);

    } catch(e) {
        //Bad request
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id',auth , async (req,res)=> {
    try {
        const task = await Task.findOneAndDelete({_id : req.params.id , owner : req.user._id});
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);

    } catch(e) {
        //Bad request
        res.status(400).send(e);
    }
});

module.exports = router
