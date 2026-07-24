import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, getUserAppointments } from "../../redux/actions/userAction";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
      dispatch(getUserAppointments(id));
    }
  }, [dispatch, id]);

  const { user, appointments, appoinmtent } = useSelector((state) => state.user || {});

  const totalAppointments = appointments || appoinmtent || [];

  const getInitials = (name) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <Layout>
      <div className="container py-3 py-md-4" style={{ minHeight: "75vh" }}>

        {/* User Profile Card */}
        <div className="card p-3 p-md-4 shadow-sm border-0 mb-4 bg-white rounded-3">
          <h5 className="mb-3 text-secondary border-bottom pb-2 font-weight-bold">
            User Profile Details
          </h5>

          <div className="row align-items-center">
            {/* Avatar Section */}
            <div className="col-12 col-md-3 text-center mb-3 mb-md-0">
              {user?.image ? (
                <img
                  src={`data:image/jpeg;base64,${user?.image}`}
                  alt="userImage"
                  className="rounded-circle border shadow-sm img-fluid"
                  style={{ width: "90px", height: "90px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle bg-info d-flex align-items-center justify-content-center text-white mx-auto shadow-sm"
                  style={{ height: "90px", width: "90px", fontSize: "36px", fontWeight: "bold" }}
                >
                  {getInitials(user?.name)}
                </div>
              )}
            </div>

            {/* User Info Details Section */}
            <div className="col-12 col-md-9">
              <div className="row g-2 g-md-3 text-start">
                <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                  <h6 className="text-muted mb-0 small font-weight-bold text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                    NAME
                  </h6>
                  <p className="fw-semibold text-dark mb-0 fs-6">{user?.name || "NA"}</p>
                </div>

                <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                  <h6 className="text-muted mb-0 small font-weight-bold text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                    EMAIL
                  </h6>
                  <p className="fw-semibold text-dark mb-0 fs-6 text-break">{user?.email || "NA"}</p>
                </div>

                <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                  <h6 className="text-muted mb-0 small font-weight-bold text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                    PHONE
                  </h6>
                  <p className="fw-semibold text-dark mb-0 fs-6">{user?.phone || "NA"}</p>
                </div>

                <div className="col-12 col-sm-6">
                  <h6 className="text-muted mb-0 small font-weight-bold text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                    ADDRESS
                  </h6>
                  <p className="fw-semibold text-dark mb-0 fs-6">{user?.address || "NA"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booked Appointments Card */}
        <div className="card p-3 p-md-4 shadow-sm border-0 bg-white rounded-3">
          <h5 className="mb-3 text-secondary border-bottom pb-2 font-weight-bold">
            All Booked Appointments
          </h5>

          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0 text-nowrap">
              <thead className="table-light">
                <tr className="small text-uppercase text-muted">
                  <th className="py-2">SN</th>
                  <th className="py-2">Appointment Date</th>
                  <th className="py-2">Appointment Time</th>
                  <th className="py-2">DOCTOR NAME</th>
                  <th className="py-2">FEES</th>
                  <th className="py-2">STATUS</th>
                  <th className="py-2">PAYMENT</th>
                </tr>
              </thead>
              <tbody>
                {totalAppointments?.length > 0 ? (
                  totalAppointments.map((a, i) => (
                    <tr key={i + 1}>
                      <td className="fw-bold text-secondary">{i + 1}</td>
                      <td>{a?.slotDate}</td>
                      <td>{a?.slotTime}</td>
                      <td className="fw-semibold text-primary">
                        {a?.doctorId?.name || a?.doctorName || "Assigned Doctor"}
                      </td>
                      <td className="fw-medium">{a?.amount}/- RS</td>
                      <td>
                        <span
                          className={`badge px-2 py-1.5 text-capitalize ${
                            a?.visitStatus === "completed" ? "bg-success" :
                            a?.visitStatus === "cancelled" ? "bg-danger" : "bg-primary"
                          }`}
                        >
                          {a?.visitStatus || "Scheduled"}
                        </span>
                      </td>
                      <td>
                        <span className={`badge px-2 py-1.5 ${a?.payment ? "bg-light text-success border border-success" : "bg-light text-warning border border-warning"}`}>
                          {a?.payment ? "ONLINE" : "CASH"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted fw-medium">
                      No appointments found for this user.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default UserDetails;