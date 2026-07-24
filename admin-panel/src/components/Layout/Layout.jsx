import React, { useState } from "react";
import Menus from "./Menus";
import Footer from "./Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Mobile Sticky Navbar Header */}
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
        {/* Mobile Header Inside Drawer */}
        <div className="sidebar-drawer-header d-flex justify-content-between align-items-center p-3 border-bottom border-secondary d-md-none">
          <h5 className="m-0 text-white font-weight-bold">Navigation</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close"
          ></button>
        </div>

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