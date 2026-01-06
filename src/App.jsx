import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if(!text.trim()) return;

    setTodos([
      ...todos,
      {id: Date.now(), text, completed: false}
    ]);

    setText("");

    console.log("Todo: "+todos);
    console.log("Text: "+text);

  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => todo.id === id ? {...todo, completed:!todo.completed}:todo)
    );
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? {...todo, text:editText}:todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <>
     <input value={text} onChange={e => setText(e.target.value)} placeholder='Enter your text' />
     <button onClick={addTodo}>Save</button>

     <h1>Display Todo</h1>

     <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
     </div>

     <ul>
      {
        filteredTodos.map(task => (
          <li key={task.id}>
            {editId === task.id ? (
              <>
              <input value={editText} onChange={e => setEditText(e.target.value)} />
              <button onClick={() => saveEdit(task.id)}>Save</button>
              </>
            ): (
              <>
              <span onClick={() => toggleTodo(task.id)} style={{textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer"}}>{task.text}</span>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTodo(task.id)}><i className="fa-solid fa-trash fa-shake" style={{color: "#ff0000"}}></i></button>
              </>
            )}
          
          </li>
        ))
      }
     </ul>

    </>
  )
}

export default App
