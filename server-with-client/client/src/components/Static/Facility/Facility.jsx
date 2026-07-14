import React, { useState } from "react";
import "./Facility.css";
import FacilityData from "./FacilityData.json";

const Facility = () => {
  // Modal states setup to control rendering and tracking selected items
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (data) => {
    setSelectedFacility(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <h1 className="facilityHeadig">Facilities</h1>
      
      {/* Cards Display Grid Section */}
      <div className="facility-container">
        {FacilityData.map((d, i) => (
          <div 
            className="card" 
            key={i} 
            onClick={() => handleCardClick(d)}
            style={{ cursor: "pointer" }}
          >
            <i className={`${d.icon} card-img-top`}></i>
            <div className="card-body">
              <h5 className="card-title">{d.title}</h5>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic PopUp Modal (Activates cleanly when any card is clicked) */}
      {isModalOpen && selectedFacility && (
        <div 
          className="modal d-block show" 
          tabIndex="-1" 
          style={{ backgroundColor: "rgba(0,0,0,0.55)", zIndex: 10005, position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px", padding: "15px" }}>
            <div className="modal-content border-0 shadow-lg text-start" style={{ borderRadius: "10px" }}>
              
              {/* Modal Header */}
              <div className="modal-header text-white py-3" style={{ backgroundColor: "#008080", borderRadius: "10px 10px 0 0" }}>
                <h5 className="modal-title fw-bold d-flex align-items-center gap-2 mb-0" style={{ fontSize: "18px" }}>
                  <i className={selectedFacility.icon}></i>
                  {selectedFacility.title}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white shadow-none" 
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>

              {/* Modal Body Info Sections */}
              <div className="modal-body p-4">
                <p className="text-muted mb-3" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                  {selectedFacility.info}
                </p>
                
                <hr className="my-3 text-light" style={{ borderTop: "1px solid #eee" }} />
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold text-secondary small">CONSULTATION FEES</span>
                  <span className="badge bg-success px-3 py-2 fs-6" style={{ fontSize: "14px" }}>
                    {selectedFacility.fees}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold text-secondary small">TIMINGS (OPD)</span>
                  <span className="text-dark fw-bold small">{selectedFacility.timing}</span>
                </div>
              </div>

              {/* Modal Close Button */}
              <div className="modal-footer border-0 pt-0 pb-3">
                <button 
                  type="button" 
                  className="btn btn-secondary w-100 fw-semibold py-2" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ backgroundColor: "#6c757d" }}
                >
                  Go Back
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Facility;