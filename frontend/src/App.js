import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Home from "./pages/Home/Home.component";
import Navigation from "./components/shared/Navigation/Navigation.component";
import Authenticate from "./pages/Authenticate/Authenticate.component";
import Activate from "./pages/Activate/Activate.component";
import Rooms from "./pages/Rooms/Rooms.component";

// const isAuth = false;
// const user = {
//   activated: false,
// };

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />

        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.userAuth);
  // const navigate = useNavigate();

  //<Navigate to="/rooms" />

  return isAuth ? <Navigate to="/rooms" /> : children;
};

const SemiProtectedRoute = ({ children }) => {
  const { isAuth,userDetails } = useSelector((state) => state.userAuth);
  // const navigate = useNavigate();

  //<Navigate to="/" />
  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !userDetails.activated ? (
    children
  ) : (
    <Navigate to="/rooms" />
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuth,userDetails } = useSelector((state) => state.userAuth);
  // const navigate = useNavigate();

  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !userDetails.activated ? (
    <Navigate to="/activate" />
  ) : (
    children
  );
};

export default App;
