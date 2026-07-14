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

  const thStyle = { whiteSpace: "nowrap", verticalAlign: "middle" };

  return (
    <>
      <div className="container-fluid my-5 px-4" style={{ minHeight: "65vh" }}>
        <div className="row justify-content-center">
          <div className="col-12">
            <h4 className="text-center mb-4 fw-bold">My All Appointments</h4>

            <div className="card p-4 shadow-sm border-0 bg-white">
              <div className="table-responsive">
                <table className="table table-hover table-striped align-middle mb-0 w-100">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3" style={thStyle}>SNO</th>
                      <th className="py-3" style={thStyle}>Doctor Name</th>
                      <th className="py-3" style={thStyle}>Appointment Date</th>
                      <th className="py-3" style={thStyle}>Appointment Time</th>
                      <th className="py-3" style={thStyle}>FEES</th>
                      <th className="py-3" style={thStyle}>Visit Status</th>
                      <th className="py-3" style={thStyle}>Payment</th>
                      <th className="py-3" style={thStyle}>Details</th>
                      <th className="py-3 text-center" style={thStyle}>Update Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalAppointments?.length > 0 ? (
                      totalAppointments?.map((a, i) => {
                        const currentStatus = a?.visitStatus || "scheduled";

                        return (
                          <tr key={i + 1}>
                            <td className="fw-bold text-secondary">{i + 1}</td>

                            <td className="fw-semibold text-dark">
                              {a?.doctorId?.name || a?.doctorName || "Dr. Assigned"}
                            </td>

                            <td>{a?.slotDate}</td>
                            <td>{a?.slotTime}</td>
                            <td>{a?.amount}/- RS</td>

                            <td>
                              <span className={`badge ${getStatusBadgeClass(currentStatus)} px-3 py-2`}>
                                {getStatusLabel(currentStatus)}
                              </span>
                            </td>

                            <td>
                              {a?.payment ? (
                                <span className="badge bg-success px-3 py-2">Paid Online</span>
                              ) : (
                                <span className="badge bg-warning text-dark px-2 py-2">
                                  Pay at Hospital
                                </span>
                              )}
                            </td>

                            <td>
                              <Link
                                to={`/user/appointments/${a?._id}`}
                                className="btn btn-outline-primary btn-sm text-decoration-none"
                              >
                                details
                              </Link>
                            </td>

                            <td className="text-center">
                              {currentStatus === "scheduled" ? (
                                <button
                                  className="btn btn-danger btn-sm px-3"
                                  onClick={() => handleCancel(a?._id)}
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
                        <td colSpan="9" className="text-center py-4 text-muted">
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