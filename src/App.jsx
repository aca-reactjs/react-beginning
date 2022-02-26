import { useState } from "react";

import getId from "./util/generateIds.util";
import TodoForm from "./components/TodoForm/TodoForm";

import "./App.css";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const [textValue, setTextValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  console.log(`🐞 / App / todoList`, todoList);

  const handleInputChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleTodoFormSubmit = (e) => {
    e.preventDefault();

    if (!textValue.trim()) {
      return;
    }

    const newItem = {
      id: getId(),
      text: textValue,
      isEditMode: false,
    };

    setTodoList((prevState) => [...prevState, newItem]);
    setTextValue("");
  };

  const handleTodoItemClick = (id) => () => {
    setTodoList((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? { ...item, isEditMode: true, draftText: item.text }
          : item
      )
    );
  };

  const handleTodoItemChange = (id) => (e) => {
    setTodoList((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, text: e.target.value } : item
      )
    );
  };

  const handleTodoItemFormSubmit = (id) => (e) => {
    e.preventDefault();

    setTodoList((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              isEditMode: false,
              text: !item.text.trim() ? item.draftText : item.text,
            }
          : item
      )
    );
  };

  return (
    <div>
      <TodoForm
        onFormSubmit={handleTodoFormSubmit}
        inputValue={textValue}
        onInputChange={handleInputChange}
      />
      <TodoList
        todoItems={todoList}
        onItemClick={handleTodoItemClick}
        onTodoItemChange={handleTodoItemChange}
        onTodoItemFormSubmit={handleTodoItemFormSubmit}
      />
    </div>
  );
}

export default App;
