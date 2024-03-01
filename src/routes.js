import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Registration";
import Login from "./Login";
import Error from "./error";
import Dashboard from "./Dashboard";

function getToken() {
  return localStorage.getItem("token");
}

const AppRouter = () => {
  const [token, setToken] = useState(getToken());

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
