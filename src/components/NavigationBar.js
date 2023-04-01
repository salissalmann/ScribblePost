import React from "react";
import { Link } from "react-router-dom";
//recp

import NoteContext from "../context/NotesContext";
import { useContext } from "react";

const NavigationBar = () => {
  const Context = useContext(NoteContext);

  const NavigationMain = {
    backgroundColor: "white",
    borderBottom: "4px solid  #69D4C6",
  };

  const NavStyle = {
    textDecoration: "none",
    padding: "1rem",
    color: "white",
  };

  const Title=
  {
    padding: "0.3rem",
    textDecoration: "none",
    color: "#69D4C6",
    fontsize: "5rem"

  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={NavigationMain}>
        <div className="container-fluid">
          <a className="navbar-brand mx-2" href="/" style={Title}>
            {Context.SiteName}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/PublicArticles" style={NavStyle}>
                  Public Articles
                </Link>
              </li>
            
              <li className="nav-item">
                <Link to="/Home" style={NavStyle}>
                  Private Articles
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/About" style={NavStyle}>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex">
            <Link className="btn" to="/Login" role="button">
              Logout
            </Link>
            </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
