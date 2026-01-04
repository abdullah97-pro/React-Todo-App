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
    </>
  )
}

export default App
