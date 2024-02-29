import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Todo from "./components/Todo";
import { addTodo, getAllTodo, updateTodo } from "./utils/HandleApi";

function App() {
  const layout = [
    { i: "a", x: 0, y: 2, w: 2, h: 6, static: false },
    { i: "b", x: 2, y: 2, w: 4, h: 6, static: false },
    {
      i: "c",
      x: 0,
      y: 6,
      w: 6,
      h: 48,
      static: false,
    },
  ];

  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllTodo(setTodo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setTodoId(_id);
  };

  const handleAddOrUpdate = () => {
    if (text.trim() === "") {
      setErrorMessage("Input should not be empty");
      return; // Early Exit the function to prevent further execution
    }
    setErrorMessage(""); // Clear any existing error message

    if (isUpdating) {
      updateTodo(todoId, text, setText, setTodo, setIsUpdating);
    } else {
      addTodo(text, setText, setTodo);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
          isResizable={true}
          isDraggable={false}
        >
          <div key="a" className="left-section">
            <h1>Todo App</h1>
          </div>
          <div key="b" className="Todo">
            <h2>Add Todo</h2>
            <div className="text-field">
              <input
                type="text"
                placeholder="Add a Todo!"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="add" onClick={handleAddOrUpdate}>
                {isUpdating ? "Update" : "Add"}
              </div>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}{" "}
              {/* Display error message */}
            </div>
          </div>
          <div key="c" className="list">
            <h2 className="all-todos">All Todos</h2>
            {todo.map((item) => (
              <Todo
                key={item._id}
                text={item.text}
                updateMode={() => updateMode(item._id, item.text)}
              />
            ))}
          </div>
        </GridLayout>
      </div>
    </div>
  );
}

export default App;
