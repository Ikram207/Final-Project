const Task = require('../models/Task');

// GET all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des tâches" });
  }
};

// CREATE new task
const createTask = async (req, res) => {
  const { title, description, deadline } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      deadline,
      user: req.user._id
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création de la tâche" });
  }
};

// UPDATE task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche" });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    await task.remove();
    res.json({ message: "Task removed" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression de la tâche" });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
