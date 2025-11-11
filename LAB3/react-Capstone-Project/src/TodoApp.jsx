// TodoApp.jsx
import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function TodoApp() {
  // Danh sách todo khởi tạo
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Tođo app", completed: true },
  ]);

  // Thêm công việc mới
  const addTodo = (text) => {
    if (text.trim() === "") return;
    const newTodo = {
      id: Date.now(), // tạo id duy nhất
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle hoàn thành / chưa hoàn thành
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Xóa công việc
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default TodoApp;
