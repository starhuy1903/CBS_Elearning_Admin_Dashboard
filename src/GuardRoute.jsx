import { Navigate, Outlet } from "react-router-dom";
import Layout from "./components/Layout";

const checkLogin = () => !!localStorage.getItem("token");

export const PrivateRoute = () => {
  return checkLogin() ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export const AuthRoute = () => {
  return !checkLogin() ? <Outlet /> : <Navigate to="/" />;
};
