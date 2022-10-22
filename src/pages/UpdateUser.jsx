import React from "react";
import { useLocation } from "react-router-dom";
import UserForm from "../components/UserForm";

const UpdateUser = () => {
  const location = useLocation();
  const userInfo = location.state?.user;
  return <UserForm userInfo={userInfo} />;
};

export default UpdateUser;
