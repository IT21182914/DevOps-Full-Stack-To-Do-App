const Todo = require("../models/todoModel");

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new todo
exports.createTodo = async (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ message: "Task is required" });

  try {
    const newTodo = await Todo.create({ task });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle todo completion
exports.toggleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
