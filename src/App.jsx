import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const [filter, setFilter] = useState("all");
  const [hydrated, setHydrated] = useState(false);

  const [schedule, setSchedule] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [editSchedule, setEditSchedule] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  // ---------- DATE HELPERS ----------
  const today = () => new Date().toISOString().split("T")[0];

  const getRemainingWeekDays = () => {
    const days = [];
    const now = new Date();
    const todayIndex = now.getDay();

    for(let i = todayIndex; i <= 6; i++) {
      const d = new Date(now);

      d.setDate(now.getDate() + (i - todayIndex));

      days.push({
        label: d.toLocaleDateString("en-US", {weekday:"long"}),
        value: d.toISOString().split("T")[0]
      });
    }

    return days;
  };

  // LOAD from localStorage (once)
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
    setHydrated(true);
  }, []);

  // SAVE to localStorage (after load)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, hydrated]);

// Add todo list

  const handleScheduleChange = (value) => {
    setSchedule(value);
    setDueDate("");

    if (value === "daily") {
      setDueDate(today());
    }
  };

  const addTodo = () => {
    if (!text.trim() || !dueDate) return;

    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false, schedule, dueDate },
    ]);

    setText("");
    setSchedule("");
    setDueDate("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text"
      />
      <select value={schedule} onChange={(e) => handleScheduleChange(e.target.value)}>
        <option value="">Select Schedule</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="custom">Custom</option>
      </select>

      {schedule === "weekly" && (
        <select value={dueDate} onChange={(e) => setDueDate(e.target.value)}>
          <option value="">Select Day</option>
          {getRemainingWeekDays().map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>
      )}

      {schedule === "custom" && (
        <input type="date" min={today()} value={dueDate}
        onChange={(e) => setDueDate(e.target.value)} />
      )}

      <button onClick={addTodo}>Save</button>

      <h1>Display Todo</h1>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTodos.map((task) => (
          <li key={task.id}>
            {editId === task.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <select>
                  <option value="">Select Schedule</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom</option>
                </select>
                <button onClick={() => saveEdit(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTodo(task.id)}
                  style={{
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                    cursor: "pointer",
                  }}
                >
                  {task.text}
                </span>
                <small style={{ marginLeft: "10px", color: "#0922dbff" }}>{task.dueDate}</small>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTodo(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
