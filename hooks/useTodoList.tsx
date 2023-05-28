import { useState } from 'react';
import type { SingleTask } from '../utils/types';

export const useTodoList = () => {
  const [tasks, setTasks] = useState<SingleTask[]>([
    {
      id: 1,
      title: 'Practice React Native',
      note: '',
      pomodoroCount: 2,
      pomodoroEstimate: 4,
      checked: false,
      selected: true,
    },
    {
      id: 2,
      title: 'Learn Ionic',
      note: '',
      pomodoroCount: 0,
      pomodoroEstimate: 5,
      checked: false,
      selected: false,
    },
  ]);

  const addTask = (title: string, note: string) => {
    const newTask = {
      id: Date.now(),
      title,
      note,
      pomodoroCount: 0,
      pomodoroEstimate: 0,
      checked: false,
      selected: false,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  const checkTask = (id: number) => {
    setTasks(
      tasks.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      }),
    );
  };

  const selectTask = (id: number) => {
    setTasks(
      tasks.map((todo) => {
        if (todo.id === id) {
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
      }),
    );
  };

  const deleteCheckedTasks = () => {
    setTasks(tasks.filter((todo) => !todo.checked));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const incrementPomodoroCount = () => {
    console.log(JSON.stringify(tasks[0].pomodoroCount));
    setTasks(
      tasks.map((todo) => {
        if (todo.selected) {
          return { ...todo, pomodoroCount: todo.pomodoroCount + 1 };
        }
        return todo;
      }),
    );
  };

  return {
    todos: tasks,
    addTask,
    deleteTask,
    checkTask,
    selectTask,
    deleteCheckedTasks,
    deleteAllTasks,
    incrementPomodoroCount,
  };
};
