import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./components/store";
import TaskBoard from "./components/TaskBoard";

ReactDOM.render(
  <Provider store={store}>
    <TaskBoard />
  </Provider>,
  document.getElementById("root")
);




