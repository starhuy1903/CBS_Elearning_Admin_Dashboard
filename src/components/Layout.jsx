import React from "react";
import { selectActiveMenu } from "../redux/uiSlice";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const activeMenu = useSelector(selectActiveMenu);
  return (
    <div className="flex relative">
      {activeMenu ? (
        <div className="w-72 fixed sidebar bg-white dark:bg-secondary-dark-bg ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
          activeMenu ? "md:ml-72" : "flex-2"
        }`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>
        <div className="p-2 sm:p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
