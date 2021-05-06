/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Icon, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { HashLink as HLink } from "react-router-hash-link";
import { Home } from "@material-ui/icons";
import { Info } from "@material-ui/icons";
import { ContactMail } from "@material-ui/icons";
import axios from "axios";
import {
  Dashboard,
  PersonSharp,
  AddCircleOutline,
  EventAvailable,
  ExitToApp,
} from "@material-ui/icons";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "./siteHeader.css";

function SiteHeader() {
  const [isLogged, setIsLogged] = useState("");
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("firstLogin");
      const JWTtoken = readCookie("token");
      if (!token || !JWTtoken) {
        return false;
      } else {
        return true;
      }
    };
    setIsLogged(checkToken);
  }, []);

  const readCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const logoutUser = () => {
    localStorage.removeItem("firstLogin");
    var delete_cookie = function (name) {
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    };
    delete_cookie("token");

    window.location.href = "/";
  };

  return (
    <div id="site-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            {isLogged ? (
              <ul className="navbar-nav container-fluid justify-content-end">
                <li className="nav-item">
                  <IconButton>
                    <Home style={{ fontSize: "20px" }} />
                    <Link to="/create" className="nav-link">
                      Create Task
                    </Link>
                  </IconButton>
                </li>
                <li className="nav-item">
                  <IconButton fontSize="small">
                    <ExitToApp style={{ fontSize: "20px" }} />
                    <Link to="/" onClick={logoutUser} className="nav-link">
                      Logout
                    </Link>
                  </IconButton>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav container-fluid justify-content-end">
                <li className="nav-item">
                  <IconButton>
                    <PersonSharp style={{ fontSize: "20px" }} />
                    <Link to="/" className="nav-link">
                      Login
                    </Link>
                  </IconButton>
                </li>
                <li className="nav-item">
                  <IconButton>
                    <AddCircleOutline style={{ fontSize: "20px" }} />
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </IconButton>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SiteHeader;
