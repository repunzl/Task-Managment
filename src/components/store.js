import { createStore } from "redux";

const initialState = {
  tasks: {
    columns: {
      preparation: [
        { id: 1, title: "Préparer le projet", progress: 10 },
        { id: 2, title: "Lire la documentation", progress: 30 },
      ],
      inProgress: [],
      done: [],
    },
  },
};

const MOVE_TASK = "MOVE_TASK";
const DELETE_TASK = "DELETE_TASK";
const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
export const moveTask = (payload) => ({ type: MOVE_TASK, payload });
export const deleteTask = (payload) => ({ type: DELETE_TASK, payload });
export const addTask = (payload) => ({ type: ADD_TASK, payload });
export const editTask = (payload) => ({ type: EDIT_TASK, payload });
const rootReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case MOVE_TASK:
      const { taskId, fromColumn, toColumn } = payload;
      const taskToMove = state.tasks.columns[fromColumn].find(
        (task) => task.id === taskId
      );
      return {
        ...state,
        tasks: {
          columns: {
            ...state.tasks.columns,
            [fromColumn]: state.tasks.columns[fromColumn].filter(
              (task) => task.id !== taskId
            ),
            [toColumn]: [...state.tasks.columns[toColumn], taskToMove],
          },
        },
      };

    case DELETE_TASK:
      const { column, taskId: idToDelete } = payload;
      return {
        ...state,
        tasks: {
          columns: {
            ...state.tasks.columns,
            [column]: state.tasks.columns[column].filter(
              (task) => task.id !== idToDelete
            ),
          },
        },
      };

    case ADD_TASK:
      const { title, column: addColumn } = payload;
      const newTask = {
        id: Date.now(), 
        title,
        progress: 0,
      };
      return {
        ...state,
        tasks: {
          columns: {
            ...state.tasks.columns,
            [addColumn]: [...state.tasks.columns[addColumn], newTask],
          },
        },
      };

    case EDIT_TASK:
      const { taskId: editId, column: editColumn, newTitle } = payload;
      return {
        ...state,
        tasks: {
          columns: {
            ...state.tasks.columns,
            [editColumn]: state.tasks.columns[editColumn].map((task) =>
              task.id === editId ? { ...task, title: newTitle } : task
            ),
          },
        },
      };

    default:
      return state;
  }
};
export const store = createStore(rootReducer);
