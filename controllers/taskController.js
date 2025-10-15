const Task = require('../models/Task');

let tasks = [];
let nextId = 1;

const getAllTasks = (req, res) => {
  res.json({
    success: true,
    count: tasks.length,
    data: tasks
  });
};

// Add a new task
const addTask = (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }

  const newTask = new Task(nextId++, title.trim());
  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: 'Task added successfully',
    data: newTask
  });
};

// Remove a task by ID
const removeTask = (req, res) => {
  const { id } = req.params;
  const taskId = parseInt(id);

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  const removedTask = tasks.splice(taskIndex, 1)[0];

  res.json({
    success: true,
    message: 'Task removed successfully',
    data: removedTask
  });
};

// Get a single task by ID
const getTaskById = (req, res) => {
  const { id } = req.params;
  const taskId = parseInt(id);

  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  res.json({
    success: true,
    data: task
  });
};


module.exports = {
  getAllTasks,
  addTask,
  removeTask,
  getTaskById
};
