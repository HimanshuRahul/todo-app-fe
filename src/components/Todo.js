import React from "react";
import { BiSolidEditAlt } from "react-icons/bi";

const Todo = ({ _id, text, updateMode, deleteTodo }) => {
  return (
    <div className="todo">
      <div className="text">{text}</div>
      <div className="icons">
        <BiSolidEditAlt
          className="icon"
          onClick={() => updateMode(_id, text)}
        />
      </div>
    </div>
  );
};

export default Todo;
