import { useContext, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { StateContext, DispatchContext } from "./context/GlobalContext";
import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
} from "./context/constants/userConstants";
import axios from "axios";
import Index from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import About from "./pages/about";
import NotFound from "./pages/404";
import Contact from "./pages/contact";
import Homes from "./pages/homes";
import Admin from "./pages/admin";
import Addhome from "./pages/addhome";
import Showhome from "./pages/showhome";
import Suggest from "./pages/suggest";
import Estate from "./pages/estate";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("userToken");
      if (token && !state.user.auth) {
        dispatch({
          type: USER_LOGIN_REQUEST,
        });
        try {
          const { data } = await axios.get("/api/users/profile", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: { ...data, auth: true },
          });
        } catch (err) {
          dispatch({
            type: USER_LOGIN_FAIL,
            error: err,
          });
        }
      }
    }
    getUserData();
  }, [dispatch, state.user.auth]);
  return (
    <Routes>
      <Route exact path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/real-estate" element={<Estate />} />
      <Route
          path="/homes"
          element={
            <PrivateRoute>
              <Homes />
            </PrivateRoute>
          }
      />
      <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
      />
      <Route
          path="/addhome"
          element={
            <PrivateRoute>
              <Addhome />
            </PrivateRoute>
          }
      />
      <Route
          path="/showHomes"
          element={
            <PrivateRoute>
              <Showhome />
            </PrivateRoute>
          }
      />
      <Route
          path="/suggest"
          element={
            <PrivateRoute>
              <Suggest />
            </PrivateRoute>
          }
      />

      
      <Route element={<NotFound />} />
    </Routes>
    
  );
}

export default App;
