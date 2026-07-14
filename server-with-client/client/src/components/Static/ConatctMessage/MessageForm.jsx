import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendWebMessage } from "../../../redux/actions/authActions";
import { reset } from "../../../redux/slice/authSlice";

const MessageForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [msgType, setMsgType] = useState("Enquiry");
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleMessage = (e) => {
    e.preventDefault();

    if (!name || !contact || !message) {
      return toast.error("Please provide all fields (Name, Contact, and Message)");
    }

    dispatch(reset());
    setSubmitting(true);
    const msgData = { name, contact, message, type: msgType };
    dispatch(sendWebMessage(msgData));
  };

  useEffect(() => {
    if (submitting && success) {
      toast.success(`Thank you! Your ${msgType.toLowerCase()} has been sent to our team.`);
      setName("");
      setMessage("");
      setContact("");
      setMsgType("Enquiry");
      setSubmitting(false);
      dispatch(reset());
    }
    if (submitting && error) {
      toast.error(error);
      setSubmitting(false);
      dispatch(reset());
    }
  }, [success, error, submitting, msgType, dispatch]);

  const getDynamicContent = () => {
    switch (msgType) {
      case "Feedback":
        return {
          label: "Your Feedback Description",
          placeholder: "Share your experience with our doctors, staff, or cleanliness...",
          buttonText: "Submit Feedback",
        };
      case "Complaint":
        return {
          label: "Your Complaint Description",
          placeholder: "Please describe the issue, trouble, or complaint you faced in detail...",
          buttonText: "Submit Complaint",
        };
      case "Enquiry":
      default:
        return {
          label: "Your Enquiry Description",
          placeholder: "Type your health query or message here...",
          buttonText: "Submit Enquiry",
        };
    }
  };

  const dynamicContent = getDynamicContent();

  return (
    <>
      <div className="card p-4 shadow-sm border-0 bg-white mform-card">
        <h3 className="fw-bold mb-2 text-start" style={{ color: "#008080" }}>
          Contact & Feedback
        </h3>
        <p className="text-muted small text-start mb-4">
          Have a query or want to share your hospital experience? Select the option below and drop your message.
        </p>

        <form onSubmit={handleMessage} className="d-flex flex-column gap-3">
          <div className="form-group text-start">
            <label className="small fw-semibold text-secondary mb-1">Select Purpose</label>
            <select
              className="form-control py-2 shadow-none"
              value={msgType}
              onChange={(e) => setMsgType(e.target.value)}
              style={{ cursor: "pointer" }}
            >
              <option value="Enquiry">General Enquiry / Question</option>
              <option value="Feedback">Hospital Feedback / Review</option>
              <option value="Complaint">Report an Issue / Complaint</option>
            </select>
          </div>

          <div className="form-group text-start">
            <label className="small fw-semibold text-secondary mb-1">Full Name</label>
            <input
              type="text"
              className="form-control py-2 shadow-none"
              placeholder="Enter your name"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group text-start">
            <label className="small fw-semibold text-secondary mb-1">Email Address / Contact</label>
            <input
              type="text"
              className="form-control py-2 shadow-none"
              placeholder="Enter your email or phone number"
              required={true}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="form-group text-start">
            <label className="small fw-semibold text-secondary mb-1">
              {dynamicContent.label}
            </label>
            <textarea
              className="form-control shadow-none"
              placeholder={dynamicContent.placeholder}
              name="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required={true}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn text-white fw-semibold py-2 w-100 mt-2 shadow-sm contact-submit-btn"
            style={{ backgroundColor: "#008080", transition: "all 0.3s ease" }}
            disabled={submitting}
          >
            <i className="fa-solid fa-paper-plane me-2"></i>
            {submitting ? "Sending..." : dynamicContent.buttonText}
          </button>
        </form>
      </div>
    </>
  );
};

export default MessageForm;