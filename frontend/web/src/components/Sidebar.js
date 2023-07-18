import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../sidebar.css";
import { SidebarMusic, SidebarEmployee,SidebarStats } from "../assets/index"

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/recordingList",
      name: "Recording List",
      //   icon: <FaTh />,
      icon: (
        <span>
          <img src={SidebarMusic}></img>
        </span>
      ),
    },
    {
      path: "/employeeList",
      name: "Employee List",
      icon: (
        <span>
          <img src={SidebarEmployee}></img>
        </span>
      ),
    },
    {
      path: "/summaryAnalysis",
      name: "Summary Analysis",
      icon: (
        <span>
          <img src={SidebarStats}></img>
        </span>
      ),
    },
  ];
    
  return (
    <div className="flex">
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="text-md"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main >{children}</main>
    </div>
  );
};

export default Sidebar;
