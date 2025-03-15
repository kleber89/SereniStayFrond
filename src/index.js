import React from "react";
import './index.css';
import { createRoot } from "react-dom/client";
import App from "./App"; // Importamos el componente principal App

const root = createRoot(document.getElementById('root'));

// Render usando el nuevo método de React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);