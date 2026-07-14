import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShortIntro.css";
import ImageHos from "../../../assets/images/hospital/hos.jpg";

const ShortIntro = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="intro-container">
        <div className="row">
          <div className="col-md-6 img-container">
            <img src={ImageHos} alt="hosimage" className="hos-image" />
          </div>
          <div className="col-md-5 info-container">
            <h1>CR Global Hospital</h1>
            <h6>A Super Specility Hospital</h6>
            <p>
              CR Global Hospital has been serving the heart of Delhi since 2012, combining advanced medical technology with compassionate, patient-centered care. Our team consists of over 50 experienced specialists across cardiology, orthopedics, gynecology, pediatrics, and general medicine. We are equipped with 24x7 emergency services, state-of-the-art diagnostic labs, and comfortable in-patient facilities designed for a smooth recovery experience. 
            </p>
            <p>
             At CR, we believe that quality healthcare should be accessible to everyone, which is why we offer a range of affordable treatment plans. Our focus goes beyond treating illness — we aim to support every patient's complete wellness journey. From routine check-ups to complex surgical procedures, our multidisciplinary team works together to deliver the best possible outcomes. Welcome to CR Global Hospital, where care is not just a service, but a commitment.
            </p>
            <button onClick={() => navigate("/doctors")} className="btn btn-primary">Book A Appointment Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortIntro;