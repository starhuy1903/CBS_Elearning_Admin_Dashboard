import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { AuthRoute, PrivateRoute } from "./GuardRoute";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import Register from "./pages/Register";
import Users from "./pages/Users";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Users />} />
          <Route path="users">
            <Route index element={<Users />}></Route>
            <Route path="add" element={<EditUser />}></Route>
          </Route>
          <Route path="courses" element={<Courses />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/login" element={<AuthRoute />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
