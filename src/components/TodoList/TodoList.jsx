import { Fragment } from "react";
import "./Todo.css";

function TodoList({
  todoItems,
  onItemClick,
  onTodoItemFormSubmit,
  onTodoItemChange,
}) {
  return (
    <div className="todoWrapper">
      <ul className="todo-list">
        {todoItems.map((item) => {
          return item.isEditMode ? (
            <form onSubmit={onTodoItemFormSubmit(item.id)} key={item.id}>
              <input
                type="text"
                value={item.text}
                onChange={onTodoItemChange(item.id)}
                onBlur={onTodoItemFormSubmit(item.id)}
              />
              <button>done</button>
            </form>
          ) : (
            <li
              onClick={onItemClick(item.id)}
              className="todo-listItem"
              key={item.id}
            >
              {item.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
