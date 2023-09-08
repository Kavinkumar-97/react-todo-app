import axios from 'axios';
import { useEffect, useState } from 'react';

import '../styles/App.css';
import Header from './Header.tsx';
import { BASE_URL } from '../utils/constants.tsx';
import TodoModel from '../interfaces/Todo.ts';
import Todo from './Todo.tsx';
import TodoInput from './TodoInput.tsx';

interface TodoStore {
  todos: TodoModel[];
  selectedIndex: number | null;
}

function App() {

  const [todoStore, setTodoStore] = useState<TodoStore>({
    todos: [],
    selectedIndex: null
  });

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get<TodoModel[]>(BASE_URL);
      const completedTask = response.data.filter(todo => todo.completed);
      const pendingTask = response.data.filter(todo => !todo.completed);
      setTodoStore({ ...todoStore, todos: [...pendingTask, ...completedTask] });
    };

    fetchTodos();
  }, []);

  const createTodo = async (text: string) => {
    try {
      const todo: TodoModel = {
        id: todoStore.todos.length + 1,
        title: text,
        completed: false,
        userId: 1
      };

      const response = await axios.post<TodoModel>(`${BASE_URL}`, todo);
      const updatedTodo = response.data;
      
      alert('Created todos');
      setTodoStore(prevState => {
        const newTodos = [updatedTodo, ...prevState.todos];
        return { todos: newTodos, selectedIndex: null };
      });

    } catch (e) {
      console.log(e);
    }
  };

  const updateTodo = async (todo: TodoModel, index: number) => {
    try {
      const response = await axios.put<TodoModel>(`${BASE_URL}/${todo.id}`, todo);
      const updatedTodo = response.data;
      
      alert('Updated todos');
      setTodoStore(prevState => {
        prevState.todos[index] = updatedTodo;
        return { ...prevState, selectedIndex: null };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSaveAction = async (text: string) => {
    const { todos, selectedIndex } = todoStore;
    if (selectedIndex) {
      const todo = todos[selectedIndex];
      const newTodo: TodoModel = { ...todo, title: text };
      updateTodo(newTodo, selectedIndex);
    } else {
      createTodo(text);
    }
  };


  return (
    <>
      <Header />
      <TodoInput
        todo={todoStore.selectedIndex != null ? todoStore.todos[todoStore.selectedIndex] : null}
        onSave={handleSaveAction}
      />
      {todoStore.todos && todoStore.todos.map((todo, index) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggleCompleted={checked => {
              todoStore.todos[index].completed = checked;

              setTodoStore(prevState => {
                return { ...prevState };
              });
            }}
            onEdit={() => setTodoStore(prevState => {
              return { ...prevState, selectedIndex: index };
            })}
          />
        )
      )}
    </>
  );
}

export default App;
