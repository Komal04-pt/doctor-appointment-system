import React, { useState } from "react";
import Menus from "./Menus";
import Footer from "./Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <div className="admin-mobile-nav-bar">
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <Menus onLinkClick={() => setSidebarOpen(false)} />
      </div>

      <div className="admin-page-body">
        <div className="admin-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;