import React, { useEffect } from "react";
import {
  selectActiveMenu,
  selectScreenSize,
  setActiveMenu,
  setScreenSize,
} from "../redux/uiSlice";
import { useSelector, useDispatch } from "react-redux";
import NavButton from "./NavButton";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const dispatch = useDispatch();
  const activeMenu = useSelector(selectActiveMenu);
  const screenSize = useSelector(selectScreenSize);
  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    if (screenSize <= 900) {
      dispatch(setActiveMenu(false));
    } else {
      dispatch(setActiveMenu(true));
    }
  }, [dispatch, screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => dispatch(setActiveMenu(!activeMenu))}
        color="blue"
        icon={<AiOutlineMenu />}
      />
    </div>
  );
};

export default Navbar;
