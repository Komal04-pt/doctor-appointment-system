import React from "react";

const Topbar = () => {
  return (
    <>
      <div className="topbar-container w-100">
        {/* Horizontal single row container for mobile swipe layout */}
        <div className="topbar-scroll-wrapper">
          <div className="topbar-item">
            <i className="fa-solid fa-phone-volume"></i> Emergency Call: 1234567890
          </div>
          <div className="topbar-item">
            <i className="fa-solid fa-clock"></i> 10:00am TO 10:00pm
          </div>
          <div className="topbar-item">
            <i className="fa-solid fa-envelope"></i> help@crglobal.com
          </div>
          <div className="topbar-item">
            English <i className="fa-solid fa-caret-down"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;