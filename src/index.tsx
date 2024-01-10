import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StatsContextProvider } from "./context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StatsContextProvider>
    <App />
  </StatsContextProvider>
);
