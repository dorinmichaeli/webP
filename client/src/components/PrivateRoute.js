import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../context/GlobalContext";

function PrivateRoute({ children }) {
  const { user } = useContext(StateContext);
  return user && user.auth ? children : <Navigate to="/login" />;
}

PrivateRoute.defaultProps = {
  admin: false,
};

export default PrivateRoute;
