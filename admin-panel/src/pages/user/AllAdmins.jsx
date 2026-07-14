import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getAllAdmins } from "../../redux/actions/userAction";
import "./Allusers.css";

const AllAdmins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);

  const { admins } = useSelector((state) => state.user);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  const avatarColors = ["#0f766e", "#d97706", "#1d4ed8", "#be185d", "#7c3aed"];
  const getAvatarColor = (index) => avatarColors[index % avatarColors.length];

  return (
    <Layout>
      <div className="d-flex flex-wrap justify-content-between align-items-center users-header">
        <div>
          <h2>Admin Accounts</h2>
          <p>{admins?.length || 0} accounts with admin access</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-admin")}
        >
          + Add Admin
        </button>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {admins &&
              admins.map((admin, i) => (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="user-name-cell">
                      <div
                        className="user-avatar"
                        style={{ background: getAvatarColor(i) }}
                      >
                        {getInitials(admin?.name)}
                      </div>
                      <span>{admin?.name}</span>
                    </div>
                  </td>
                  <td className="text-muted">{admin?.email}</td>
                  <td>
                    {admin?.phone ? (
                      admin.phone
                    ) : (
                      <span className="phone-na">Not Provided</span>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/admin-details/${admin?._id}`}
                      className="details-link"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AllAdmins;