import React from "react";
import { render } from "react-dom";

import { WorkoutDataProvider } from "./contexts/WorkoutDataContext";

import App from "./components/app";
import "./app.css";

render(
  <WorkoutDataProvider>
    <App />
  </WorkoutDataProvider>,
  document.getElementById("root")
);
