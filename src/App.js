import { useState } from "react";
import "./App.css";
import { ScheduleOutlined } from "@ant-design/icons";

function App() {
  const TODO = localStorage.getItem("todos");

  const initialValue = TODO ? JSON.parse(TODO) : [];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState(initialValue);
  const [todoId, setTodoId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (todoId) {
      const updated = todos.map((todo) => {
        return todo.id === todoId
          ? { ...todo, name: name, description: description }
          : todo;
      });

      setTodos(updated);
      localStorage.setItem("todos", JSON.stringify(updated));
      setTodoId("");
    } else {
      const updated = [
        ...todos,
        { name: name, description: description, id: Math.random() },
      ];
      setTodos(updated);
      localStorage.setItem("todos", JSON.stringify(updated));
    }
    setName("");
    setDescription("");
  };

  const handleOnClick = (todo) => {
    const update = todos.filter((t) => t.id !== todo.id);
    setTodos(update);
    localStorage.setItem("todos", JSON.stringify(update));
  };

  const handleOnEdit = (t) => {
    setTodoId(t.id);
    setName(t.name);
    setDescription(t.description);
  };
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="heading">
          <span className="heading-text">Todo-App</span>
          <span className="heading-icon">
            <ScheduleOutlined />
          </span>{" "}
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-inputs-control">
            <label className="label-topic">Todo Name</label>
            <input
              value={name}
              name="name"
              placeholder="Enter Topic..."
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-inputs-control">
            <label className="label-description">Todo Description</label>
            <input
              value={description}
              name="description"
              placeholder="Enter Descrption..."
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="input_button">
            {todoId ? "Update Todo" : "Create Todo"}
          </button>
        </form>
        <h1 className="heading1">Todo-List</h1>

        <div className="todo-container">
          {todos.map((t) => {
            return (
              <div key={t.id} className="todo-card">
                <h3>{t.name}</h3>
                <p>{t.description}</p>
                <div className="card-buttons">
                  <button
                    onClick={() => {
                      handleOnEdit(t);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleOnClick(t)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
