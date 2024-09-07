import { StrictMode } from "react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.jsx";
import "./styles/index.css";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage/HomePage.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    {/* <App /> */}
    <HomePage />
  </React.StrictMode>
);
