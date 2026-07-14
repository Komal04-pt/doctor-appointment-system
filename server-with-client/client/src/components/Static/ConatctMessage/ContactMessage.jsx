import React from "react";
import "./ContactMessage.css";
import LocationMap from "./LocationMap";
import MessageForm from "./MessageForm";

const ContactMessage = () => {
  return (
    <>
      <div className="container py-2">
        {}
        <div className="row message-container align-items-stretch g-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <LocationMap />
          </div>
          <div className="col-md-6">
            <MessageForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactMessage;