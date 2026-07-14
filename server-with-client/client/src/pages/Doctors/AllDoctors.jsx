import React, { useEffect } from "react";
import "./AllDoctors.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllDoctors } from "../../redux/actions/doctorActions";
import { reset } from "../../redux/slice/authSlice";

const AllDoctors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getAllDoctors());
  }, [dispatch]);

  const { doctors } = useSelector((state) => state.doctor);

  return (
    <>
      <div className="container doc-container my-4">
        <h4 className="text-center text-success mt-3 mb-4 fw-bold">
          Select a Doctor and book your appointment online now!
        </h4>
        
        <div className="row g-4 justify-content-center">
          {doctors?.map((d) => (
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex justify-content-center" key={d._id}>
              <div className="card w-100 text-center" style={{ maxWidth: "20rem" }}>
                <NavLink to={`/doctors/${d._id}`}>
                  
                  <div className="text-center pt-2 w-100">
                    <img
                      src={d?.image || "https://static.thenounproject.com/png/1743561-200.png"}
                      alt={d?.name || "doctor"}
                      className="object-fit-cover mx-auto border rounded-3"
                      style={{ width: "160px", height: "160px" }}
                    />
                  </div>

                  <div className="card-body">
                    <h6>{d.name}</h6>
                    <p className="mb-0">{d.degree}</p>
                  </div>
                  
                  <div className="card-footer">
                    <p className="m-0 fw-semibold text-danger text-sm">
                      <i className={d.icon}></i> {d.speciality}
                    </p>
                  </div>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllDoctors;