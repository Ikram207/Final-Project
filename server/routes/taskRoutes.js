const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Toutes les routes sont protégées par JWT et liées à l'utilisateur connecté
router.route('/')
  .get(protect, getTasks)         // Récupérer les tâches de l'utilisateur
  .post(protect, createTask);     // Créer une tâche liée à l'utilisateur

router.route('/:id')
  .put(protect, updateTask)       // Modifier une tâche de l'utilisateur
  .delete(protect, deleteTask);   // Supprimer une tâche de l'utilisateur

module.exports = router;
