import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { AuthRoute, PrivateRoute } from "./GuardRoute";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import AddUser from "./pages/AddUser";
import UpdateUser from "./pages/UpdateUser";
import AddCourse from "./pages/AddCourse";
import UpdateCourse from "./pages/UpdateCourse";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Users />} />
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="add" element={<AddUser />} />
            <Route path="update" element={<UpdateUser />} />
            <Route path="detail" element={<UserDetail />} />
          </Route>
          <Route path="courses">
            <Route index element={<Courses />} />
            <Route path="add" element={<AddCourse />} />
            <Route path="update/:courseId" element={<UpdateCourse />} />
          </Route>
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
