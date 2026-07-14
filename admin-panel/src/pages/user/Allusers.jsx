import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/userAction";
import { Link } from "react-router-dom";
import "./Allusers.css";

const Allusers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.user);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  const avatarColors = ["#0f766e", "#d97706", "#1d4ed8", "#be185d", "#7c3aed"];

  const getAvatarColor = (index) => {
    return avatarColors[index % avatarColors.length];
  };

  return (
    <Layout>
      <div className="users-header">
        <h2>All Users</h2>
        <p>{users?.length || 0} registered patients</p>
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
            {users &&
              users.map((user, i) => (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="user-name-cell">
                      <div
                        className="user-avatar"
                        style={{ background: getAvatarColor(i) }}
                      >
                        {getInitials(user?.name)}
                      </div>
                      <span>{user?.name}</span>
                    </div>
                  </td>
                  <td className="text-muted">{user?.email}</td>
                  <td>
                    {user?.phone ? (
                      user.phone
                    ) : (
                      <span className="phone-na">Not Provided</span>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/user-details/${user?._id}`}
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

export default Allusers;