import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllDoctors } from "../../redux/actions/doctorActions";
import { reset } from "../../redux/slice/doctorSlice";
import "./AllDoctors.css";

const AllDoctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const { doctors } = useSelector((state) => state.doctor);

  const handleNavigateToAddDoctor = () => {
    dispatch(reset()); 
    navigate("/add-doctor"); 
  };

  return (
    <Layout>
      <div className="doctors-header">
        <div>
          <h2>All Doctors List</h2>
          <p>{doctors?.length || 0} registered doctors</p>
        </div>
        <button
          className="add-doctor-btn"
          onClick={handleNavigateToAddDoctor}
        >
          + Add Doctor
        </button>
      </div>

      <div className="doctors-table-wrapper">
        <table className="doctors-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Speciality</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((d, i) => (
              <tr key={d?._id || i + 1}>
                <td>{i + 1}</td>
                <td>
                  {d?.image && d.image.startsWith("http") ? (
                    <img src={d.image} alt="doc" className="doctor-avatar-img" />
                  ) : d?.image ? (
                    <img
                      src={`data:image/jpeg;base64,${d?.image}`}
                      alt="doc"
                      className="doctor-avatar-img"
                    />
                  ) : (
                    <div className="doctor-avatar-fallback">
                      {d?.name?.charAt(0) || "?"}
                    </div>
                  )}
                </td>
                <td className="fw-semibold">{d?.name}</td>
                <td className="text-muted">{d?.speciality}</td>
                <td>₹{d?.fees}</td>
                <td>
                  <span
                    className={`status-badge ${
                      d?.available ? "status-available" : "status-unavailable"
                    }`}
                  >
                    {d?.available ? "Available" : "Not Available"}
                  </span>
                </td>
                <td>
                  <Link to={`/doctor-details/${d?._id}`} className="details-link">
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

export default AllDoctors;