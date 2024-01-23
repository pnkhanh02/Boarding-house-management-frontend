import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header(props) {
  let navigate = useNavigate();
  return (
    <div className="header">
      <div className="dropdown">
        <button className="dropbtn">{localStorage.getItem("username")}</button>
        <div className="dropdown-content">
          <a href="#profile">Profile</a>
          {/* <a href="#settings">Settings</a> */}
          <a
            href="#logout"
            onClick={() => {
              navigate("/");
            }}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
