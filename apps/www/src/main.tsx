import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./instrumentation";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
