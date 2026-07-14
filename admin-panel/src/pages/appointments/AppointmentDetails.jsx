import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentDetails,
  updateAppointmentStatus,
} from "../../redux/actions/appointmentAction";
import { reset } from "../../redux/slice/appointmentSlice";
import InputSelect from "../../components/Forms/InputSelect";
import toast from "react-hot-toast";

const AppointmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [appointmentStatus, setAppointmentStatus] = useState("");

  useEffect(() => {
    dispatch(reset());
    dispatch(getAppointmentDetails(id));
  }, [dispatch, id]);

  const { appointment, error, statusUpdateSuccess } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    if (appointment) {
      setAppointmentStatus(appointment?.bookingStatus || "");
    }
  }, [appointment]);

  const handleUpdateStatus = () => {
    if (!appointmentStatus) {
      return toast.error("Please select a status");
    }
    dispatch(updateAppointmentStatus({ id, appointmentStatus }));
  };

  useEffect(() => {
    if (statusUpdateSuccess) {
      toast.success("Patient Visit Status Updated");
      dispatch(reset());
      navigate("/all-appointments");
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [statusUpdateSuccess, error, dispatch, navigate]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "no-show":
        return "bg-secondary";
      case "cancelled":
        return "bg-danger";
      case "scheduled":
      default:
        return "bg-primary";
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-4" style={{ maxWidth: "900px" }}>
        <h2 style={{ fontSize: "1.4rem" }}>Appointment & Consultation Details</h2>
        <hr />

        <div style={{ overflowX: "auto", width: "100%" }}>
          <table className="table table-bordered mt-3" style={{ minWidth: "500px" }}>
            <tbody>
              <tr>
                <th className="bg-light" style={{ width: "30%" }}>
                  Client Name
                </th>
                <td>{appointment?.clientName}</td>
              </tr>
              <tr>
                <th className="bg-light">Client Phone</th>
                <td>{appointment?.clientPhone}</td>
              </tr>
              <tr>
                <th className="bg-light">Client Email</th>
                <td>{appointment?.clientEmail}</td>
              </tr>
              <tr>
                <th className="bg-light">Doctor Name</th>
                <td>{appointment?.doctorName}</td>
              </tr>
              <tr>
                <th className="bg-light">Doctor Phone</th>
                <td>{appointment?.doctorPhone}</td>
              </tr>
              <tr>
                <th className="bg-light">Doctor Email</th>
                <td>{appointment?.doctorEmail}</td>
              </tr>
              <tr>
                <th className="bg-light">Appointment Date</th>
                <td>{appointment?.bookingDate}</td>
              </tr>
              <tr>
                <th className="bg-light">Appointment Time</th>
                <td>{appointment?.bookingTime}</td>
              </tr>
              <tr>
                <th className="bg-light">Fee Amount</th>
                <td>{appointment?.amount}/- RS</td>
              </tr>
              <tr>
                <th className="bg-light">Payment Status</th>
                <td>
                  {appointment?.paymentMode ? (
                    <span className="badge bg-success">Paid Online</span>
                  ) : (
                    <span className="badge bg-warning text-dark">
                      Pay at Hospital
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <th className="bg-light">Current Visit Status</th>
                <td>
                  <span
                    className={`badge ${getStatusBadgeClass(
                      appointment?.bookingStatus
                    )}`}
                  >
                    {appointment?.bookingStatus
                      ? appointment.bookingStatus.toUpperCase()
                      : "N/A"}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 p-4 border rounded bg-light w-100">
          <h4 style={{ fontSize: "1.2rem" }}>Update Patient Visit Status</h4>
          <p className="text-muted small">
            Select the appropriate physical visit status of the patient for
            this doctor's slot.
          </p>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <div style={{ minWidth: "180px", flex: "1 1 200px" }}>
              <InputSelect
                value={appointmentStatus}
                setValue={setAppointmentStatus}
                options={["scheduled", "completed", "no-show", "cancelled"]}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={handleUpdateStatus}
              style={{ flex: "0 0 auto" }}
            >
              SAVE VISIT STATUS
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppointmentDetails;