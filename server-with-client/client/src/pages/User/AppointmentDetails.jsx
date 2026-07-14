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
        return "bg-success";
      case "no-show":
        return "bg-secondary";
      case "cancelled":
        return "bg-danger";
      case "scheduled":
      default:
        return "bg-info";
    }
  };

  return (
    <div>
      <div className="card m-4" style={{ width: "50rem" }}>
        <div className="card-header d-flex">
          <h4>Your Appointment Details</h4>
          <Link className="btn btn-dark ms-auto" to={"/user/appointments"}>
            GO BACK
          </Link>
        </div>
        <div className="card-body">
          <p>Doctor Name : {appointment?.doctorName}</p>
          <p>Doctor Phone : {appointment?.doctorPhone}</p>
          <p>Doctor Email : {appointment?.doctorEmail}</p>
          <p>Appointment Date : {appointment?.bookingDate}</p>
          <p>Appointment Time : {appointment?.bookingTime}</p>
          <p>Doctor Amount : {appointment?.amount}/- RS</p>

          <h4
            className={`${getStatusColorClass(
              appointment?.bookingStatus
            )} w-50 text-light p-3`}
          >
            Visit Status : {getStatusLabel(appointment?.bookingStatus)}
          </h4>

          <h4
            className={`${
              appointment?.paymentMode ? "bg-success" : "bg-warning text-dark"
            } w-50 p-3`}
          >
            Payment Status :{" "}
            {appointment?.paymentMode ? "Paid Online" : "Pay at Hospital"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;