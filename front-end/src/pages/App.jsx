import "../styles/App.css";
import AppRoute from "../routes/AppRoute";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "../utils/history";
const queryClient = new QueryClient();

function App() {
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
