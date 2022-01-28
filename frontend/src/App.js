import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from "hooks/useLoadingWithRefresh";

import Home from "./pages/Home/Home.component";
import Navigation from "./components/shared/Navigation/Navigation.component";
import Authenticate from "./pages/Authenticate/Authenticate.component";
import Activate from "./pages/Activate/Activate.component";
import Rooms from "./pages/Rooms/Rooms.component";
import Loader from "components/shared/Loader/Loader.component";
import Room from "pages/Room/Room.component";

import "./App.css";

const App = () => {
  //call refresh endpoint
  const { loading } = useLoadingWithRefresh();

  return loading ? ( 
    <Loader message="Loading, please wait..."/> 
    ) : (
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

        <Route
          path="/room/:id"
          element={
            <ProtectedRoute>
              <Room/>
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  ) 
  
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
