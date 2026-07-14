import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelStatus,
  getAllAppointments,
} from "../../redux/actions/authActions";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem("appData");
    const appData = JSON.parse(localData);
    if (appData) {
      const id = appData?.user?._id;
      dispatch(getAllAppointments(id));
    }
  }, [dispatch]);

  const { appointments, appoinmtent, error, success } = useSelector((state) => state.auth);

  const totalAppointments = appointments || appoinmtent || [];

  const handleCancel = (id) => {
    dispatch(cancelStatus(id));
    if (success) {
      toast.success("Cancelled Successfully");
      window.location.reload();
    }
    if (error) {
      toast.error(error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-success-subtle text-success border border-success-subtle";
      case "no-show":
        return "bg-secondary-subtle text-secondary border border-secondary-subtle";
      case "cancelled":
        return "bg-danger-subtle text-danger border border-danger-subtle";
      case "scheduled":
      default:
        return "bg-primary-subtle text-primary border border-primary-subtle";
    }
  };

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

  const thStyle = { whiteSpace: "nowrap", verticalAlign: "middle", fontSize: "13px" };
  const tdStyle = { verticalAlign: "middle", fontSize: "13px" };

  return (
    <>
      <div className="container-fluid my-3 my-md-5 px-2 px-md-4" style={{ minHeight: "65vh" }}>
        <div className="row justify-content-center">
          <div className="col-12">
            <h5 className="text-center mb-3 fw-bold text-dark fs-5 fs-md-4">My All Appointments</h5>

            <div className="card p-2 p-md-3 shadow-sm border-0 bg-white rounded-3">
              <div className="table-responsive rounded-2 border">
                <table className="table table-hover table-striped align-middle mb-0 w-100">
                  <thead className="table-light">
                    <tr>
                      <th className="py-2.5 px-3 text-secondary" style={thStyle}>SNO</th>
                      <th className="py-2.5 px-3 text-secondary" style={thStyle}>Doctor Name</th>
                      <th className="py-2.5 px-3 text-secondary" style={thStyle}>Appointment Date</th>
                      <th className="py-2.5 px-3 text-secondary" style={thStyle}>Appointment Time</th>
                      <th className="py-2.5 px-3 text-secondary" style={thStyle}>FEES</th>
                      <th className="py-2.5 px-3 text-secondary" style={thStyle}>Visit Status</th>
                      <th className="py-2.5 px-3 text-secondary" style={thStyle}>Payment</th>
                      <th className="py-2.5 px-3 text-secondary" style={thStyle}>Details</th>
                      <th className="py-2.5 px-3 text-center text-secondary" style={thStyle}>Update Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalAppointments?.length > 0 ? (
                      totalAppointments?.map((a, i) => {
                        const currentStatus = a?.visitStatus || "scheduled";

                        return (
                          <tr key={i + 1}>
                            <td className="fw-bold text-secondary px-3" style={tdStyle}>{i + 1}</td>

                            <td className="fw-semibold text-dark text-nowrap px-3" style={tdStyle}>
                              {a?.doctorId?.name || a?.doctorName || "Dr. Assigned"}
                            </td>

                            <td className="text-nowrap px-3" style={tdStyle}>{a?.slotDate}</td>
                            <td className="text-nowrap px-3" style={tdStyle}>{a?.slotTime}</td>
                            <td className="fw-medium px-3" style={tdStyle}>₹{a?.amount}/-</td>

                            <td className="px-3" style={tdStyle}>
                              <span className={`badge ${getStatusBadgeClass(currentStatus)} px-2 py-1.5 rounded`}>
                                {getStatusLabel(currentStatus)}
                              </span>
                            </td>

                            <td className="px-3" style={tdStyle}>
                              {a?.payment ? (
                                <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1.5 rounded">Paid Online</span>
                              ) : (
                                <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1.5 rounded">
                                  Pay at Hospital
                                </span>
                              )}
                            </td>

                            <td className="px-3" style={tdStyle}>
                              <Link
                                to={`/user/appointments/${a?._id}`}
                                className="btn btn-outline-primary btn-sm px-2.5 py-1 text-decoration-none fw-medium"
                                style={{ fontSize: "12px" }}
                              >
                                details
                              </Link>
                            </td>

                            <td className="text-center px-3" style={tdStyle}>
                              {currentStatus === "scheduled" ? (
                                <button
                                  className="btn btn-danger btn-sm px-2.5 py-1 fw-medium"
                                  onClick={() => handleCancel(a?._id)}
                                  style={{ fontSize: "12px" }}
                                >
                                  Cancel
                                </button>
                              ) : (
                                <span className="text-muted small fw-medium">NA</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center py-4 text-muted small">
                          No appointments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAppointments;