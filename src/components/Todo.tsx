import { ChangeEventHandler, FunctionComponent, useState } from 'react';
import TodoModel from '../interfaces/Todo.ts';

import styles from '../styles/Todo.module.css';

type TodoProps = {
  todo: TodoModel;
  onToggleCompleted(value: boolean): void;
  onEdit(): void;
}

const Todo: FunctionComponent<TodoProps> = ({ todo, onToggleCompleted, onEdit }) => {

  const [completed, setCompleted] = useState(todo.completed);

  const handleTogggle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCompleted(e.target.checked);
    onToggleCompleted(completed);
  };

  return (
    <div className={styles.todo}>
      <input
        type='checkbox'
        name='completed'
        id={`todo-${todo.id}`}
        checked={completed}
        onChange={handleTogggle}
      />
      <label htmlFor={`todo-${todo.id}`}>
        <p>{todo.title}</p>
      </label>
      <button className={styles.editButton} onClick={onEdit}>Edit</button>
    </div>
  );
};

export default Todo;