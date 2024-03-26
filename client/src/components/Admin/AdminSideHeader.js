import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../UI/Logo";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const AdminSideHeader = (props) => {
  const regulateBackDrop = () => {
    if (props.reveal) {
      props.onCloseMenu();
    } else {
      props.sendReveal();
    }
    return;
  };
  return (
    <nav
      className={`px-sm-3  m-0 align-items-center adminSideContainer ${props.className}`}
    >
      <div className="d-flex align-items-center">
        <NavLink to="/admin">
          <Logo
            width="100px"
            height="50px"
            className="p-0 color--white pt-3"
            fill="#b92b27"
          />
        </NavLink>

        <AiOutlineClose
          className="ms-auto mt-3 me-2 close"
          onClick={props.onCloseMenu}
        />
      </div>
      <ul className="m-0 p-0 mt-3 py-2 nav--links sideLinks">
        <li className="py-2">
          <NavLink to="/admin" onClick={regulateBackDrop} className={({isActive})=> isActive ? "active-sideLink" : undefined} end>
            <span className="pe-2 ">
              <MdSpaceDashboard />
            </span>
            Dashboard
          </NavLink>
        </li>
        <li className="py-2">
          <NavLink to="profile" onClick={regulateBackDrop} className={({isActive})=> isActive ? "active-sideLink" : undefined}>
            <span className="pe-2 ">
              <CgProfile />
            </span>
            Profile
          </NavLink>
        </li>
        <li className="py-2">
          <NavLink to="/admin/users" onClick={regulateBackDrop} className={({isActive})=> isActive ? "active-sideLink" : undefined}>
            <span className="pe-2 ">
              <FaUserAlt />
            </span>
            Users
          </NavLink>
        </li>
        <li className="py-2">
          <NavLink to="/admin/posts" onClick={regulateBackDrop} className={({isActive})=> isActive ? "active-sideLink" : undefined}>
            <span className="pe-2 ">
              <BsFilePost />
            </span>
            Posts
          </NavLink>
        </li>
        <li className="py-2">
          <NavLink to="/admin/create-user" onClick={regulateBackDrop} className={({isActive})=> isActive ? "active-sideLink" : undefined}>
            <span className="pe-2 ">
              <FaUserPlus />
            </span>
            Create User
          </NavLink>
        </li>
      </ul>

      <div className="px-2 px-lg-0">
        <i className="m-0 p-0">
          <span>
            <FaTasks />
          </span>{" "}
          Task by REWORK TECHNOLOGIES, Built by JOE.
        </i>
        <i className="d-block mt-3 p-0">
          check out my Github repository{" "}
          <p>
            @
            <a
              href="https://github.com/Joe-Praise"
              target="_blank"
              rel="noopener noreferrer"
              className="link--underline"
            >
              Joe-Praise
            </a>
          </p>
        </i>
      </div>
    </nav>
  );
};
export default AdminSideHeader;
