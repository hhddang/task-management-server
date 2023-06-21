const { createOne, readAll, deleteOne, updateOne } = require('../models/task.model');
const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    let newTask = req.body;
    createOne(newTask, (err, data) => {
        if(!err) {
            console.log("Create new task: ", newTask);
            res.send("OK");
        } else {
            res.send("ERROR")
        }
    })
});

router.post('/', (req, res) => {
    let task = req.body;
    readAll(task, (err, data) => {
        if(!err) {
            console.log("Read all task: ", data);
            res.send(data);
        } else {
            res.send("ERROR")
        }
    })
})

router.post('/update', (req, res) => {
    let task = req.body;
    updateOne(task, (err, data) => {
        if(!err) {
            console.log("Update task: ", task);
            res.send("OK");
        } else {
            res.send("ERROR")
        }
    })
})

router.post('/delete', (req, res) => {
    let task = req.body;
    deleteOne(task, (err, data) => {
        if(!err) {
            console.log("Delete task: ", task);
            res.send("OK");
        } else {
            res.send("ERROR")
        }
    })
});


module.exports = router;