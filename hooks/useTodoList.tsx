import { useState } from 'react';
import type { SingleTodo } from '../utils/types';

export const useTodoList = () => {
  const [todos, setTodos] = useState<SingleTodo[]>([
    {
      id: 1,
      name: 'Practice React Native',
      note: '',
      pomodoroCount: 2,
      checked: false,
    },
    {
      id: 2,
      name: 'Learn Ionic',
      note: '',
      pomodoroCount: 4,
      checked: false,
    },
  ]);

  const addTodo = (name: string, note: string) => {
    const newTodo = {
      id: Date.now(),
      name,
      note,
      pomodoroCount: 0,
      checked: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const checkTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      }),
    );
  };

  const deleteCheckedTodos = () => {
    setTodos(todos.filter((todo) => !todo.checked));
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    checkTodo,
    deleteCheckedTodos,
    deleteAllTodos,
  };
};
