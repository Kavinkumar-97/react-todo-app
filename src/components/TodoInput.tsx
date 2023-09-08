import { FormEventHandler, FunctionComponent, useState, useEffect } from 'react';

import Todo from '../interfaces/Todo';
import styles from '../styles/TodoInput.module.css';

type TodoInputProps = {
  todo: Todo | null;
  onSave(text: string): void;
}

const TodoInput: FunctionComponent<TodoInputProps> = ({ todo, onSave }) => {
  const [title, setTitle] = useState(todo?.title);

  useEffect(() => {
    setTitle(todo?.title);
  }, [todo]);

  const handleSave: FormEventHandler<HTMLFormElement> = (e) => {
    if (title) {
      e.preventDefault();
      onSave(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSave} className={styles.todoInput}>
      <input
        type='text'
        placeholder='Write Your Todo'
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <button type='submit'>Save</button>
    </form>
  );
};

export default TodoInput;


