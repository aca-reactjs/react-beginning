import { useState } from "react";

import "./App.css";

const generateIds = () => {
  let count = 0;

  return () => {
    count += 1;

    return count;
  };
};

const getId = generateIds();

function App() {
  const [textValue, setTextValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleInputChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleTodoFormSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: getId(),
      text: textValue,
    };

    setTodoList((prevState) => [...prevState, newItem]);
    setTextValue("");
  };

  return (
    <div>
      <form className="todoForm" onSubmit={handleTodoFormSubmit}>
        <input type="text" value={textValue} onChange={handleInputChange} />
        <button className="add">Add new Todo</button>
      </form>
      <div className="listWrapper">
        <ul>
          {todoList.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
