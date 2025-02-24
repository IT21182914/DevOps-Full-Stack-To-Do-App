const express = require("express");
const {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", toggleTodo);

module.exports = router;
