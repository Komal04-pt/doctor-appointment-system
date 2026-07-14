import React from "react";
import Topbar from "./Topbar";
import NavMenu from "./NavMenu";
import { NavLink } from "react-router";
import Logo from "../../../assets/cr-global-logo.png"; 

const Navbar = () => {
  return (
    <>
      <div className="navbar-container sticky-top shadow-sm">
        {}
        <Topbar />
        
        {}
        <nav className="navbar navbar-expand-lg bg-white p-0">
          <div className="container-fluid py-2">
            
            {}
            <NavLink to="/" className="navbar-brand m-0">
              <img src={Logo} alt="logo" className="brand-logo" />
            </NavLink>
            
            {}
            <NavMenu />
            
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;