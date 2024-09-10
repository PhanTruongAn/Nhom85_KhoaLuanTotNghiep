import { useState } from "react";
import "../styles/App.css";
import AppRoute from "../routes/AppRoute";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashBoardStudent from "./DashBoard/DashBoardStudent/DashBoardStudent";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <BrowserRouter>
        <AppRoute />
        {/* <DashBoardStudent /> */}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          // hideProgressBar={false}
          // newestOnTop={false}
          // closeOnClick
          // rtl={false}
          // pauseOnFocusLoss
          // draggable
          // pauseOnHover
          // theme="light"
        />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
