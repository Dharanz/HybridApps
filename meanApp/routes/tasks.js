var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://dharanz:Dharan123@ds133632.mlab.com:33632/samplemeanapp', ['tasks'])

// Get all tasks
router.get('/tasks', (req, res, next) => {
    db.tasks.find((err, tasks) => {
        if (err) {
            res.send(err);
        }else{
            res.json(tasks);
        }
    });
});

// Get a single task
router.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if (err) {
            res.send(err);
        }else{
            res.json(task);
        }
    });
});

// Save tasks
router.post('/tasks', (req, res, next) => {
    var task = req.body;

    if (!task.title || (task.isDone = '')) {
        res.status(400);
        res.json({
            "Error":"Bad Data"
        });
    } else {
        db.tasks.save(task, (err, tasks) => {
            if (err) {
                res.send(err);
            }else{
                res.json(tasks);
            }
        });
    }
});

// Delete the task
router.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if (err) {
            res.send(err);
        }else{
            res.json(task);
        }
    });
});

// Update tasks
router.put('/tasks/:id', (req, res, next) => {
    var task = req.body;
    var updTask = {};

    if(task.title) { updTask.title = task.title; }
    if(task.isDone) { updTask.title = task.isDone; }
    
    if (!updTask) {
        res.status(400);
        res.json({
            "Error":"Bad Data"
        });
    } else {
        db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, update, {}, (err, task) => {
            if (err) {
                res.send(err);
            } else {
                res.json(task);
            }
        });
    }
});

module.exports = router;