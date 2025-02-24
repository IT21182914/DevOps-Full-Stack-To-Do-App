"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!task) return;
    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
    });
    const updatedTodo = await res.json();
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do App 📝</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-grow"
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="flex justify-between items-center mb-2">
            <span
              className={`${
                todo.completed ? "line-through text-gray-500" : ""
              } cursor-pointer`}
              onClick={() => toggleTodo(todo._id)}
            >
              {todo.task}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
