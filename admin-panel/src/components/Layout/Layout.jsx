import React, { useState } from "react";
import Menus from "./Menus";
import Footer from "./Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Mobile Top Header / Toggle Bar */}
      <div className="admin-mobile-nav-bar">
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <span className="mobile-brand-title">Admin Panel</span>
      </div>

      {/* Dark Overlay Backdrop for Mobile */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Modern Slide-over Drawer Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-mobile-header d-md-none">
          <span className="fw-bold fs-5 text-white">Navigation</span>
          <button
            className="btn-close btn-close-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close"
          ></button>
        </div>
        <Menus onLinkClick={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="admin-page-body">
        <div className="admin-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;