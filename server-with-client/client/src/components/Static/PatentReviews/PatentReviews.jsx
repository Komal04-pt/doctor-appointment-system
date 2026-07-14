import React from "react";
import "./PatentReviews.css";
import ReviewData from "./PatentReviews.json";

const PatentReviews = () => {
  return (
    <>
      <div className="review-container container py-4">
        <div className="heading-container text-center mb-4">
          <p className="text-muted small mb-1">Testimonial</p>
          <h2 className="fw-bold text-dark">What Our Patients Say About us.</h2>
        </div>

        {/* Reviews Cards Row */}
        <div className="row justify-content-center g-3">
          {ReviewData.map((d) => {
            const ratingValue = d.rating || 5; // Default 5 agar JSON mein rating na ho

            return (
              <div className="col-lg-4 col-md-6" key={d.id}>
                <div className="card text-center p-3 h-100 shadow-sm border" style={{ borderRadius: "12px", backgroundColor: "#fff" }}>
                  
                  {/* Avatar Profile Image */}
                  <div className="mb-2">
                    <img src={d.pic} alt="userpic" style={{ width: "60px", height: "60px", objectFit: "contain" }} />
                  </div>

                  {/* Name and Role */}
                  <h6 className="fw-bold mb-0">{d.name}</h6>
                  <p className="text-muted small mb-2">{d.address}</p>

                  {/* Dynamic Stars Integration */}
                  <div className="mb-2 text-warning" style={{ fontSize: "14px" }}>
                    {Array.from({ length: 5 }).map((_, i) => {
                      // 1. Full Star Condition
                      if (i < Math.floor(ratingValue)) {
                        return <span key={i} className="fas fa-star me-1"></span>;
                      }
                      // 2. Half Star Condition
                      if (i === Math.floor(ratingValue) && ratingValue % 1 !== 0) {
                        return <span key={i} className="fas fa-star-half-alt me-1"></span>;
                      }
                      // 3. Empty Star Condition (4 rating par 5th star grey dikhane ke liye)
                      return <span key={i} className="far fa-star me-1" style={{ color: "#ccc" }}></span>;
                    })}
                  </div>

                  {/* Feedbacks Title and Description */}
                  <h5 className="fw-bold text-secondary mb-1" style={{ fontSize: "16px" }}>{d.commentTile}</h5>
                  <p className="text-muted small mb-0" style={{ fontSize: "13px", lineHeight: "1.4" }}>{d.commentDescription}</p>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PatentReviews;