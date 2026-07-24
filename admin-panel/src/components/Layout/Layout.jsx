import React, { useState } from "react";
import Menus from "./Menus";
import Footer from "./Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Mobile Sticky Top Navigation Bar */}
      <div className="admin-mobile-nav-bar d-md-none">
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <span className="mobile-brand-title">Admin Panel</span>
      </div>

      {/* Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Slide-over Sidebar Drawer */}
      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Mobile Close Button (Top-Right of Drawer) */}
        <button
          type="button"
          className="sidebar-close-btn d-md-none"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Navigation Menus */}
        <Menus onLinkClick={() => setSidebarOpen(false)} />
      </div>

      {/* Main Page Content */}
      <div className="admin-page-body">
        <div className="admin-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;