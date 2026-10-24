import React from "react";
import "./App.css";
import { useState ,useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks",
      JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function toggleTask(id) {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  return (
    <div>
      <nav className="navbar">
        <h2>Daily Task Manager</h2>
        <ul>
          <li>Home</li>
          <li>All Tasks</li>
          <li>Completed</li>
          <li>About</li>
        </ul>
      </nav>
      {/* Dashboard */}
      <div className="dashboard">
        <h1>Manage Your Tasks</h1>

        <p>Stay organized and get things done!</p>

        {/* Cards */}
        <div className="cards">
          <div className="card purple">
            <h3>All Tasks</h3>
            <h2>{tasks.length}</h2>
          </div>

          <div className="card green">
            <h3>Completed</h3>
            <h2>{tasks.filter((task) => task.completed).length}</h2>
          </div>

          <div className="card yellow">
            <h3>Pending</h3>
            <h2>{tasks.filter((task) => !task.completed).length}</h2>
          </div>
          </div>
          {/* Add Task Section */}
          <div className="add-task">
            <input
              type="text"
              placeholder="Enter your task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
            onClick={() => {
              if (task.trim() !== "") {
                setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
                setTask("");
              }
             }}
             >
              Add Task
              </button>
          </div>

          <div className="task-list">
            {tasks.map((item) => (
              <div className="task-item" key={item.id}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />

                <span className={item.completed ? "completed" : ""}>
                  {item.text}
                </span>

                <button onClick={() => deleteTask(item.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>

  );
}

export default App;
