import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const NavbarLayout = () => {
  return (
    <>
      <div className="relative">
        <NavBar/>
        <Outlet/>
      </div>
    </>
  );
};

export default NavbarLayout;
