// pages/todo.js
import { useState } from 'react';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1>Todo List</h1>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a todo..."
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>Add</button>
      </div>

      <ul style={styles.list}>
        {todos.map(todo => (
          <li key={todo.id} style={{ ...styles.item, textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => toggleComplete(todo.id)} style={styles.text}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Simple inline styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    background: '#fafafa',
    fontFamily: 'sans-serif',
  },
  inputWrapper: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    fontSize: '1rem',
  },
  addButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    borderBottom: '1px solid #ddd',
  },
  text: {
    flex: 1,
    cursor: 'pointer',
  },
  deleteButton: {
    background: 'transparent',
    border: 'none',
    color: '#ff4d4d',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
};
