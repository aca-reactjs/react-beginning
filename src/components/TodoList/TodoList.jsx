import { Fragment } from "react";
import "./Todo.css";

function TodoList({
  todoItems,
  onItemClick,
  onTodoItemFormSubmit,
  onTodoItemChange,
  OnItemDelete,
}) {
  return (
    <div className="todoWrapper">
      <ul className="todo-list">
        {todoItems.map((item) => {
          return item.isEditMode ? (
            <form
              className="todoForm"
              onSubmit={onTodoItemFormSubmit(item.id)}
              key={item.id}
            >
              <input
                type="text"
                value={item.text}
                onChange={onTodoItemChange(item.id)}
                onBlur={onTodoItemFormSubmit(item.id)}
              />
              <button className="add">done</button>
            </form>
          ) : (
            <li
              onClick={onItemClick(item.id)}
              className="todo-listItem"
              key={item.id}
            >
              <span>{item.text}</span>
              <span onClick={OnItemDelete(item.id)}>X</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
