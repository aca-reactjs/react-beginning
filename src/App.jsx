import { useEffect, useState } from "react";

import getId from "./util/generateIds.util";
import TodoForm from "./components/TodoForm/TodoForm";

import "./App.css";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const [textValue, setTextValue] = useState("");
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoItems")) || []
  );

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

  const handleItemDelete = (id) => (e) => {
    e.stopPropagation();

    setTodoList((prevState) => prevState.filter((item) => item.id !== id));
  };

  useEffect(() => {
    console.log("I work");
    const unload = () => {
      localStorage.setItem("todoItems", JSON.stringify(todoList));
    };

    window.addEventListener("beforeunload", unload);

    return () => {
      window.removeEventListener("beforeunload", unload);
    };
  }, [todoList]);

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
        OnItemDelete={handleItemDelete}
      />
    </div>
  );
}

export default App;
