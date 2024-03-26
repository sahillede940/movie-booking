import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Outlet, Navigate } from 'react-router-dom'
import "./App.css";


const PrivateRoutes = () => {
    let auth = localStorage.getItem("token");
    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

const App = () => {
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<Login />} />

      </Routes>
    </Router>
  );
};

export default App;
