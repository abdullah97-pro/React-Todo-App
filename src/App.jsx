import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

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

  return (
    <>
     <input value={text} onChange={e => setText(e.target.value)} placeholder='Enter your text' />
     <button onClick={addTodo}>Save</button>

     <h1>Display Todo</h1>

     <ul>
      {
        todos.map(task => (
          <li key={task.id}>{task.text} 
          <button onClick={() => setTodos(t => t.id !== task.id)}><i className="fa-solid fa-trash fa-shake" style={{color: "#ff0000"}}></i></button>
          </li>
        ))
      }
     </ul>
    </>
  )
}

export default App
