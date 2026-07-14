import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentDetails } from "../../redux/actions/authActions";

const AppointmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { appointment } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAppointmentDetails(id));
  }, [dispatch, id]);

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Visit Completed";
      case "no-show":
        return "No Show";
      case "cancelled":
        return "Cancelled";
      case "scheduled":
      default:
        return "Scheduled";
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-success text-white";
      case "no-show":
        return "bg-secondary text-white";
      case "cancelled":
        return "bg-danger text-white";
      case "scheduled":
      default:
        return "bg-info text-dark";
    }
  };

  return (
    <div className="container py-4 px-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-7">
          <div className="card shadow-sm rounded-3 border-light-subtle">
            <div className="card-header d-flex align-items-center py-3 bg-light">
              <h5 className="mb-0 fw-bold text-dark fs-6 fs-sm-5">Your Appointment Details</h5>
              <Link className="btn btn-dark btn-sm ms-auto fw-medium" to={"/user/appointments"}>
                GO BACK
              </Link>
            </div>
            <div className="card-body p-3 p-sm-4 text-start">
              <div className="row g-2 mb-3 small text-dark">
                <div className="col-12 border-bottom pb-1">
                  <strong>Doctor Name :</strong> {appointment?.doctorName}
                </div>
                <div className="col-12 border-bottom pb-1">
                  <strong>Doctor Phone :</strong> {appointment?.doctorPhone}
                </div>
                <div className="col-12 border-bottom pb-1">
                  <strong>Doctor Email :</strong> {appointment?.doctorEmail}
                </div>
                <div className="col-12 border-bottom pb-1">
                  <strong>Appointment Date :</strong> {appointment?.bookingDate}
                </div>
                <div className="col-12 border-bottom pb-1">
                  <strong>Appointment Time :</strong> {appointment?.bookingTime}
                </div>
                <div className="col-12 border-bottom pb-1">
                  <strong>Doctor Amount :</strong> ₹{appointment?.amount}/-
                </div>
              </div>

              <div className="d-flex flex-column gap-2 mt-3 pt-2">
                <div className={`${getStatusColorClass(appointment?.bookingStatus)} rounded p-2.5 fw-semibold text-center text-sm`}>
                  Visit Status : {getStatusLabel(appointment?.bookingStatus)}
                </div>

                <div className={`${appointment?.paymentMode ? "bg-success text-white" : "bg-warning text-dark"} rounded p-2.5 fw-semibold text-center text-sm`}>
                  Payment Status : {appointment?.paymentMode ? "Paid Online" : "Pay at Hospital"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;