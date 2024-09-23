import { useState } from "react";
import "../styles/App.css";
import AppRoute from "../routes/AppRoute";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import DashBoardStudent from "./DashBoard/DashBoardStudent/DashBoardStudent";
import ManagerHome from "./DashBoard/DashBoardManager/home/home";
import StudentHome from "./DashBoard/DashBoardStudent/home/home";
import { QueryClient, QueryClientProvider } from "react-query";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "../utils/history";
const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HistoryRouter history={history}>
            <AppRoute />
            <ToastContainer autoClose={1000} />
          </HistoryRouter>
        </QueryClientProvider>
      </Provider>
    </Fragment>
  );
}

export default App;
