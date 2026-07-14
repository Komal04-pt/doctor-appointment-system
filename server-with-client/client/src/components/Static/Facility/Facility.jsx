import React, { useState } from "react";
import "./Facility.css";
import FacilityData from "./FacilityData.json";

const Facility = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (data) => {
    setSelectedFacility(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <h1 className="facilityHeadig">Facilities</h1>
      
      <div className="facility-container">
        {FacilityData.map((d, i) => (
          <div 
            className="card" 
            key={i} 
            onClick={() => handleCardClick(d)}
            style={{ cursor: "pointer" }}
          >
            <i className={d.icon}></i>
            <div className="card-body">
              <h5 className="card-title">{d.title}</h5>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedFacility && (
        <div 
          className="modal d-block show" 
          tabIndex="-1" 
          style={{ backgroundColor: "rgba(0,0,0,0.55)", zIndex: 10005, position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px", padding: "15px" }}>
            <div className="modal-content border-0 shadow-lg text-start" style={{ borderRadius: "10px" }}>
              
              <div className="modal-header text-white py-3" style={{ backgroundColor: "#008080", borderRadius: "10px 10px 0 0" }}>
                <h5 className="modal-title fw-bold d-flex align-items-center gap-2 mb-0" style={{ fontSize: "16px" }}>
                  <i className={selectedFacility.icon}></i>
                  {selectedFacility.title}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white shadow-none" 
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body p-3">
                <p className="text-muted mb-3" style={{ fontSize: "13px", lineHeight: "1.5" }}>
                  {selectedFacility.info}
                </p>
                
                <hr className="my-2 text-light" style={{ borderTop: "1px solid #eee" }} />
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold text-secondary" style={{ fontSize: "11px" }}>CONSULTATION FEES</span>
                  <span className="badge bg-success px-2 py-1" style={{ fontSize: "12px" }}>
                    {selectedFacility.fees}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold text-secondary" style={{ fontSize: "11px" }}>TIMINGS (OPD)</span>
                  <span className="text-dark fw-bold" style={{ fontSize: "12px" }}>{selectedFacility.timing}</span>
                </div>
              </div>

              <div className="modal-footer border-0 pt-0 pb-3">
                <button 
                  type="button" 
                  className="btn btn-secondary w-100 fw-semibold py-2" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ backgroundColor: "#6c757d", fontSize: "13px" }}
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