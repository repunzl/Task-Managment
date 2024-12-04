import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveTask, deleteTask, addTask, editTask } from "./store";
import './TaskBoard.css';

const TaskBoard = () => {
  const columns = useSelector((state) => state.tasks.columns);
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  const handleMoveTask = (taskId, fromColumn) => {
    let toColumn = "";
    if (fromColumn === "preparation") toColumn = "inProgress";
    else if (fromColumn === "inProgress") toColumn = "done";

    if (toColumn) {
      dispatch(moveTask({ taskId, fromColumn, toColumn }));
    }
  };

  const handleDeleteTask = (taskId, column) => {
    dispatch(deleteTask({ taskId, column }));
  };

  const handleAddTask = (column) => {
    if (newTaskTitle.trim() && column === "preparation") {
      dispatch(addTask({ title: newTaskTitle, column }));
      setNewTaskTitle("");
    }
  };

  const handleEditTask = (taskId, column) => {
    if (editTaskTitle.trim()) {
      dispatch(editTask({ taskId, column, newTitle: editTaskTitle }));
      setEditTaskId(null);
      setEditTaskTitle("");
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div className="TaskBoard">
        {Object.keys(columns).map((column) => (
          <div className="column" key={column}>
            <h2>{column}</h2>
            <div>
              {columns[column].map((task) => (
                <div className="task" key={task.id}>
                  {editTaskId === task.id ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="text"
                        value={editTaskTitle}
                        onChange={(e) => setEditTaskTitle(e.target.value)}
                        placeholder="Edit task title"
                      />
                      <button onClick={() => handleEditTask(task.id, column)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h3>{task.title}</h3>
                        <p>Progress: {task.progress}%</p>
                      </div>
                      <div style={{ display: "flex", gap: "5px" }}>
                        {column !== "done" && (
                          <button onClick={() => handleMoveTask(task.id, column)}>
                            →
                          </button>
                        )}
                        <button onClick={() => handleDeleteTask(task.id, column)}>
                          X
                        </button>
                        <button
                          onClick={() => {
                            setEditTaskId(task.id);
                            setEditTaskTitle(task.title);
                          }}
                        >
                          ✎
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            {column === "preparation" && (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="New task title"
                />
                <button onClick={() => handleAddTask(column)}>+ Add Task</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;





