import { useState, Component } from "react";

import "./App.css";

const generateIds = () => {
  let count = 0;

  return () => {
    count += 1;

    return count;
  };
};

const getId = generateIds();

class App extends Component {
  state = {
    textValue: "",
    todoList: [],
  };

  handleInputChange = (e) => {
    this.setState({ ...this.state, textValue: e.target.value });
  };

  handleTodoFormSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: getId(),
      text: this.state.textValue,
    };

    this.setState({
      ...this.state,
      textValue: "",
      todoList: [...this.state.todoList, newItem],
    });
  };

  render() {
    return (
      <div>
        <div>
          <form className="inputWrapper" onSubmit={this.handleTodoFormSubmit}>
            <input
              type="text"
              value={this.state.textValue}
              onChange={this.handleInputChange}
            />
            <button className="add">Add new Todo</button>
          </form>
        </div>
        <div>
          <ul>
            {this.state.todoList.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
