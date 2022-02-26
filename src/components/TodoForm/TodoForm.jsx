function TodoForm({ onFormSubmit, inputValue, onInputChange }) {
  return (
    <form className="todoForm" onSubmit={onFormSubmit}>
      <input type="text" value={inputValue} onChange={onInputChange} />
      <button className="add">Add new Todo</button>
    </form>
  );
}

export default TodoForm;
