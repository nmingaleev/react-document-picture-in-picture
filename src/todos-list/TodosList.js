import { forwardRef, useSyncExternalStore } from 'react';
import { TodoItem } from './todo-item';
import { todosStore } from '../store/todosStore';

import './TodosList.css';

export const TodosList = forwardRef((props, ref) => {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);

  return (
    <div className='list' ref={ref}>
      <div className='list__header'>
        ToDos

        <button onClick={todosStore.addTodo}>Add ToDo</button>
      </div>

      <div className='list__content'>
        {todos.map(item => (
          <TodoItem
            key={item.id}
            item={item} 
            onRemove={() => todosStore.removeTodo(item.id)}
          />
        ))}
      </div>
    </div>
  );
});