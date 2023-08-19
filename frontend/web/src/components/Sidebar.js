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
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import { BASE_URL } from "../pages/config";

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/recordingList",
      name: "Recording List",
      icon: (
          <LibraryMusicOutlinedIcon />

      ),
    },
    {
      path: "/employeeList",
      name: "Employee List",
      icon: (
        <PeopleOutlineOutlinedIcon />
      ),
    },
    {
      path: "/summaryAnalysis",
      name: "Summary Analysis",
      icon: (
        <InsertChartOutlinedIcon />
      ),
    },
  ];
    
  return (
    <div className="flex">
      <div style={{ width: isOpen ? "250px" : "70px" }} className="sidebar fixed z-[1000]">
        <div className="top_section">
          <p style={{ display: isOpen ? "block" : "none" }} className="text-sm font-bold">
            Customer Service Analyzer 
          </p>
          <div style={{ marginLeft: isOpen ? "40px" : "0px" }} className="bars">
            <FaBars
              className="ml-2"
              style={{ fill: "#60388B" }}
              onClick={toggle}
            />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link rounded-lg m-2"
            activeClassName="active"
          >
            <div className="icon flex items-center justify-center py-1">
              {item.icon}
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="text-md flex mt-1"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;