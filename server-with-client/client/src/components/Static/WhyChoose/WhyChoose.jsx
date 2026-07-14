import React from "react";
import "./WhyChoose.css";
import Image1 from "../../../assets/images/hospital/personalize.png";
import Image2 from "../../../assets/images/hospital/trust.png";
import Image3 from "../../../assets/images/hospital/empower.png";

const WhyChoose = () => {
  return (
    <>
      <h1 className="text-center mt-5">Why Choose Us?</h1>
      <div className="row why-container">
        <div className="col-md-3">
          <img src={Image1} alt="image1" width={"150px"} />
          <h2>Personalize Excellence</h2>
          <p>
           At CR Global Hospital, Our specialists understand each patient's history and concerns before designing a customized care plan. Every diagnosis and treatment is tailored to the individual, not a generic protocol. This attention to detail leads to better outcomes and a more comfortable experience. At CR Global Hospital, excellence isn't just a standard — it's personal.
          </p>
        </div>
        <div className="col-md-3">
          <img src={Image2} alt="image1" width={"150px"} />
          <h2> Trusted Care </h2>
          <p>
            Trust is the foundation of everything we do at Meridian Care Hospital. We ensure complete transparency in diagnosis, treatment, and costs, so patients always know what to expect. Our doctors follow the highest ethical standards, communicating honestly at every stage. Families placing their loved ones in our hands can be confident that care is given with integrity. At CR Global Hospital, trust isn't assumed — it's earned.
          </p>
        </div>
        <div className="col-md-3">
          <img src={Image3} alt="image1" width={"150px"} />
          <h2>Empowring Wellness Journey</h2>
          <p>
        True care doesn't end when symptoms disappear — it means preparing patients for the long run. We educate every patient about their condition and preventive strategies for the future. Rather than passive recipients, we encourage patients to actively manage their own health.. At CR Global Hospital, your health journey is a partnership.
          </p>
        </div>
      </div>
    </>
  );
};

export default WhyChoose;
