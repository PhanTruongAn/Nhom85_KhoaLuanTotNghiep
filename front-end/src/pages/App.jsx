import { useState } from "react";
import "../styles/App.css";
import AppRoute from "../routes/AppRoute";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashBoard from "./DashBoard/DashBoard";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <BrowserRouter>
        {/* <AppRoute /> */}
        <DashBoard />
        <ToastContainer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
