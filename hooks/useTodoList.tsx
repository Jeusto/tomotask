import { useState } from 'react';
import type { SingleTodo } from '../utils/types';

export const useTodoList = () => {
  const [todos, setTodos] = useState<SingleTodo[]>([
    {
      id: 1,
      name: 'Practice React Native',
      note: '',
      pomodoroCount: 2,
      pomodoroEstimate: 4,
      checked: false,
      selected: true,
    },
    {
      id: 2,
      name: 'Learn Ionic',
      note: '',
      pomodoroCount: 0,
      pomodoroEstimate: 5,
      checked: false,
      selected: false,
    },
  ]);

  const addTodo = (name: string, note: string) => {
    const newTodo = {
      id: Date.now(),
      name,
      note,
      pomodoroCount: 0,
      pomodoroEstimate: 0,
      checked: false,
      selected: false,
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

  const selectTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
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
    selectTodo,
    deleteCheckedTodos,
    deleteAllTodos,
  };
};
