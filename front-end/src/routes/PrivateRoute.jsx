import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { fetchToken } from "../redux/userSlice";
import history from "../utils/history";
/* eslint-disable */
const PrivateRoute = (props) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.userInit);
  // const checkAuth = async () => {
  //   if (window.location.pathname !== "/login") {
  //     dispatch(fetchToken());
  //   }
  // };
  const checkAuth = async () => {
    if (!reduxData.isAuthenticated && isEmpty(reduxData.user)) {
      dispatch(fetchToken());
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  if (reduxData.isAuthenticated === false || isEmpty(reduxData.user)) {
    history.forward();
    return null;
  } else {
    return props.component;
  }
};
PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
export default PrivateRoute;
