import React from "react";
import TaskBoard from "./components/TaskBoard";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Task Board</h1>
      <TaskBoard />
    </div>
  );
};

export default App;

