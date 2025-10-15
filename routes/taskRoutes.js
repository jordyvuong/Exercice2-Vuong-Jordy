const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /tasks - Display all tasks
router.get('/', taskController.getAllTasks);

// GET /tasks/:id - Get a single task by ID
router.get('/:id', taskController.getTaskById);

// POST /tasks - Add a new task
router.post('/', taskController.addTask);

// DELETE /tasks/:id - Remove a task
router.delete('/:id', taskController.removeTask);

module.exports = router;
