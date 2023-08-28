import './TodoItem.css';

export const TodoItem = ({ item, onRemove }) => {
  const handleClick = () => {
    onRemove();
  }

  return (
    <div className="todo-item">
      {item.text}

      <button onClick={handleClick}>Remove</button>
    </div>
  )
}