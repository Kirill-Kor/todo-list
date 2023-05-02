const Task = require('../models/tasks.model');


const router = require('express').Router();

router.post('/', (req,res) => {
    const newTask = req.body;
    Task.create(newTask, res);

})

router.get('/', (req, res) => {
    Task.getAll(res);

})

router.get('/:taskId', (req, res) => {
    Task.getTaskById(req, res);
})

router.patch('/:taskId', (req, res) => {
    Task.patchTaskById(req, res);
})

module.exports = router;