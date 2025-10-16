const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connxion to db
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue',
    endpoints: {
      'GET /tasks': 'Afficher toutes les tâches',
      'GET /tasks/:id': 'Afficher une tâche spécifique',
      'POST /tasks': 'Ajouter une nouvelle tâche (body: { title })',
      'DELETE /tasks/:id': 'Supprimer une tâche'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Try accessing http://localhost:${PORT}/tasks to view all tasks`);
});

module.exports = app;
