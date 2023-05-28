import { SingleTask, NewTask } from '../utils/types';

import { create } from 'zustand';

interface TodoListState {
  tasks: SingleTask[];
  addTask: (newTaskDetails: NewTask) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newTaskDetails: NewTask) => void;
  checkTask: (id: number) => void;
  selectTask: (id: number) => void;
  deleteCheckedTasks: () => void;
  deleteAllTasks: () => void;
  incrementPomodoroCount: () => void;
}

const useTodoListStore = create<TodoListState>((set) => ({
  tasks: [
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
  ],
  addTask: (newTaskDetails) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Math.floor(Math.random() * 100000000),
          title: newTaskDetails.title,
          note: newTaskDetails.note,
          pomodoroEstimate: newTaskDetails.pomodoroEstimate,
          pomodoroCount: 0,
          checked: false,
          selected: false,
        },
      ],
    }));
  },
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((todo) => todo.id !== id),
    }));
  },
  updateTask: (id, newTaskDetails) => {
    set((state) => ({
      tasks: state.tasks.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: newTaskDetails.title,
            note: newTaskDetails.note,
            pomodoroEstimate: newTaskDetails.pomodoroEstimate,
          };
        }
        return todo;
      }),
    }));
  },
  checkTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      }),
    }));
  },
  selectTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((todo) => {
        if (todo.id === id) {
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false };
      }),
    }));
  },
  deleteCheckedTasks: () => {
    set((state) => ({
      tasks: state.tasks.filter((todo) => !todo.checked),
    }));
  },
  deleteAllTasks: () => {
    set({ tasks: [] });
  },
  incrementPomodoroCount: () => {
    set((state) => ({
      tasks: state.tasks.map((todo) => {
        if (todo.selected) {
          return { ...todo, pomodoroCount: todo.pomodoroCount + 1 };
        }
        return todo;
      }),
    }));
  },
}));

export const useTodoList = (): TodoListState => useTodoListStore();
