/** @jsx h */
import { h, useState } from "./jsx-runtime";
import "./styles/todo.css";

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

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)} className="delete-button">
        Delete
      </button>
    </div>
  );
};

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo.id}>
          <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

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
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={getInput()}
        onInput={(e: any) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        Add
      </button>
    </form>
  );
};

const TodoApp = () => {
  const [getTodos, setTodos] = useState<Todo[]>([]);
  const [getFilter, setFilter] = useState<"all" | "active" | "completed">(
    "all"
  );

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

  const filteredTodos = getTodos().filter((todo) => {
    if (getFilter() === "active") return !todo.completed;
    if (getFilter() === "completed") return todo.completed;
    return true;
  });

  const total = getTodos().length;
  const completed = getTodos().filter((t) => t.completed).length;

  return (
    <div className="todo-app">
      <h2>Todo List</h2>
      <AddTodoForm onAdd={addTodo} />
      <div className="todo-filters">
        <button
          onClick={() => setFilter("all")}
          className={`filter-button ${getFilter() === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`filter-button ${
            getFilter() === "active" ? "active" : ""
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`filter-button ${
            getFilter() === "completed" ? "active" : ""
          }`}
        >
          Completed
        </button>
      </div>
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <div className="todo-summary">
        Total: {total} | Completed: {completed}
      </div>
    </div>
  );
};

export { TodoApp };
