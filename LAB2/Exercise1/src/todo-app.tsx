/** @jsx createElement */
import { createElement, useState } from "./jsx-runtime";

 // Define TypeScript interfaces
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

 // TodoItem component
const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const textStyle = {
    textDecoration: todo.completed ? "line-through" : "none",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        margin: "4px 0",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={textStyle}>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

// TodoList component
const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
};


// AddTodoForm component
const AddTodoForm = ({ onAdd }: { onAdd: (text: string) => void }) => {
  const [getInput, setInput] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const text = getInput();
    if (text.trim() === "") return;
    onAdd(text);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={getInput()}
        onInput={(e: any) => setInput(e.target.value)}
        placeholder="Enter a new task..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

// Main TodoApp component
const TodoApp = () => {
  const [getTodos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...getTodos(), newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      getTodos().map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(getTodos().filter((todo) => todo.id !== id));
  };

  const total = getTodos().length;
  const completed = getTodos().filter((t) => t.completed).length;

  return (
    <div
      style={{ fontFamily: "sans-serif", maxWidth: "400px", margin: "auto" }}
    >
      <h2>Todo List</h2>
      <AddTodoForm onAdd={addTodo} />
      <TodoList
        todos={getTodos()}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <p>
        Total: {total} | Completed: {completed}
      </p>
    </div>
  );
};

export { TodoApp };
