const { createOne, readAll, deleteOne, updateOne } = require('../models/project.model');
const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    let newProject = req.body;
    createOne(newProject, (err, data) => {
        if(!err) {
            console.log("Create new project: ", newProject);
            res.send("OK");
        } else {
            res.send("ERROR")
        }
    })
});

router.post('/', (req, res) => {
    let project = req.body;
    readAll(project, (err, data) => {
        if(!err) {
            console.log("Read all project: ", data);
            res.send(data);
        } else {
            res.send("ERROR")
        }
    })
})

router.post('/update', (req, res) => {
    let project = req.body;
    updateOne(project, (err, data) => {
        if(!err) {
            console.log("Update project: ", project);
            res.send("OK");
        } else {
            res.send("ERROR")
        }
    })
})

router.post('/delete', (req, res) => {
    let project = req.body;
    deleteOne(project, (err, data) => {
        if(!err) {
            console.log("Delete project: ", project);
            res.send("OK");
        } else {
            res.send("ERROR")
        }
    })
});


module.exports = router;