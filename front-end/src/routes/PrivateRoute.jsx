import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { fetchToken } from "../redux/userSlice";
const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.userInit);

  useEffect(() => {
    const checkAuth = async () => {
      if (window.location.pathname !== "/login") {
        dispatch(fetchToken());
      }
    };
    checkAuth();
  }, []);

  if (reduxData.isAuthenticated === false || isEmpty(reduxData.user)) {
    navigate("/login");
  } else if (reduxData.isLoading === true) {
    return <></>;
  } else {
    return props.component;
  }
};

export default PrivateRoute;
