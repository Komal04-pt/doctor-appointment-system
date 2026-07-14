import React from "react";

const LocationMap = () => {
  return (
    <>
      <div 
        className="location-map shadow-sm bg-white p-2 h-100 d-flex align-items-stretch" 
        style={{ borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)" }}
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d41010.33778467963!2d77.11171180531804!3d28.648924005121504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1781680356327!5m2!1sen!2sin" 
          width="100%"
          className="responsive-iframe-map"
          style={{ 
            border: 0, 
            borderRadius: "8px",
            minHeight: "300px",
            height: "100%"
          }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade" 
        />
      </div>
    </>
  );
};

export default LocationMap;