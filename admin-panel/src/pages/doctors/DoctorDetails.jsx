import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDoctor,
  getDoctorDetails,
  updateDoctor,
  updateStatus,
} from "../../redux/actions/doctorActions";
import InputForm from "../../components/Forms/InputForm";
import InputSelect from "../../components/Forms/InputSelect";
import toast from "react-hot-toast";

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);

  const { doctor, success, error } = useSelector((state) => state.doctor);
  const [edit, setEdit] = useState(true);

  const [name, setName] = useState(doctor?.name);
  const [email, setEmail] = useState(doctor?.email);
  const [image, setImage] = useState(doctor?.image);
  const [speciality, setSpeciality] = useState(doctor?.speciality);
  const [experience, setExperience] = useState(doctor?.experience);
  const [degree, setDegree] = useState(doctor?.degree);
  const [about, setAbout] = useState(doctor?.about);
  const [fees, setFees] = useState(doctor?.fees);
  const [address, setAddress] = useState(doctor?.address);
  const [gender, setGender] = useState(doctor?.gender);
  const [phone, setPhone] = useState(doctor?.phone);

  useEffect(() => {
    if (doctor) {
      setName(doctor?.name);
      setEmail(doctor?.email);
      setImage(doctor?.image);
      setSpeciality(doctor?.speciality);
      setExperience(doctor?.experience);
      setDegree(doctor?.degree);
      setAbout(doctor?.about);
      setAddress(doctor?.address);
      setFees(doctor?.fees);
      setGender(doctor?.gender);
      setPhone(doctor?.phone);
    }
  }, [doctor]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("about", about);
    formData.append("speciality", speciality);
    formData.append("fees", fees);
    formData.append("experience", experience);
    formData.append("degree", degree);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("image", image);
    formData.append("gender", gender);
    dispatch(updateDoctor({ id, formData }));
    if (success) {
      toast.success("Doctor Updated");
      navigate("/all-doctors");
    }
    if (error) {
      toast.error(error);
    }
  };

  const handleDelete = () => {
    const confirm = window.confirm("Are you Sure Want To Delete This Doctor ?");
    if (confirm) {
      dispatch(deleteDoctor(id));
    }
    if (success) {
      toast.success("Doctor Deleted!");
      navigate("/all-doctors");
    }
    if (error) {
      toast.error(error);
    }
  };

  const handleUpdateStatus = (id, availabeStatus) => {
    dispatch(updateStatus({ id, availabeStatus }));
    if (success) {
      toast.success("Doctor Status Updated!");
      navigate("/all-doctors");
    }
    if (error) {
      toast.error(error);
    }
  };

  const renderDoctorImage = () => {
    if (typeof doctor?.image === "string" && doctor.image.startsWith("http")) {
      return (
        <img
          src={doctor.image}
          alt="docimage"
          className="rounded-circle border shadow-sm"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
      );
    }
    if (typeof doctor?.image === "string" && doctor.image.length > 0) {
      return (
        <img
          src={`data:image/jpeg;base64,${doctor.image}`}
          alt="docimage"
          className="rounded-circle border shadow-sm"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
      );
    }
    return (
      <div
        className="bg-primary text-white rounded-circle border shadow-sm d-flex align-items-center justify-content-center fw-bold"
        style={{ width: "80px", height: "80px", fontSize: "1.8rem" }}
      >
        {doctor?.name?.charAt(0) || "?"}
      </div>
    );
  };

  return (
    <Layout>
      <div className="container-fluid py-3 px-2 px-md-4">
        <div className="card border-0 shadow-sm rounded-3 p-3 p-md-4 mx-auto" style={{ maxWidth: "900px" }}>
          
          {/* Header Bar */}
          <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
            <h2 className="m-0 text-dark fw-bold" style={{ fontSize: "1.3rem" }}>
              Doctor Details
            </h2>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-warning fw-semibold px-3"
                onClick={() => setEdit(!edit)}
              >
                {edit ? "EDIT" : "CANCEL"}
              </button>
              <button
                className="btn btn-sm btn-danger fw-semibold px-3"
                onClick={() => handleDelete(doctor?._id)}
              >
                DELETE
              </button>
            </div>
          </div>

          {/* Profile Header */}
          <div className="d-flex align-items-center gap-3 mb-4">
            {renderDoctorImage()}
            <div>
              <h3 className="m-0 text-dark fw-bold" style={{ fontSize: "1.2rem" }}>
                {doctor?.name || "Doctor Profile"}
              </h3>
              <span className="badge bg-light text-secondary border mt-1 fs-6">
                {doctor?.speciality || "General"}
              </span>
            </div>
          </div>

          {/* 2-Column Responsive Grid Form */}
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <InputForm label={"Name"} value={name} setValue={setName} disabled={edit} />
            </div>
            <div className="col-12 col-md-6">
              <InputForm label={"Email"} value={email} setValue={setEmail} disabled={edit} />
            </div>
            <div className="col-12 col-md-6">
              <InputForm label={"Degree"} value={degree} setValue={setDegree} disabled={edit} />
            </div>
            <div className="col-12 col-md-6">
              <InputSelect
                label={"Speciality"}
                value={speciality}
                setValue={setSpeciality}
                disabled={edit}
                options={[
                  "Select Speciality",
                  "General",
                  "Neurology",
                  "Cardiology",
                  "Dermatology",
                  "Pediatrics",
                  "Orthopedics",
                  "Dental",
                  "Mental",
                  "Eye",
                  "Gynecology",
                ]}
              />
            </div>
            <div className="col-12 col-md-6">
              <InputSelect
                label={"Gender"}
                value={gender}
                setValue={setGender}
                options={["Select Gender", "Male", "Female"]}
                disabled={edit}
              />
            </div>
            <div className="col-12 col-md-6">
              <InputForm label={"Experience"} value={experience} setValue={setExperience} disabled={edit} />
            </div>
            <div className="col-12 col-md-6">
              <InputForm label={"Fees"} value={fees} setValue={setFees} disabled={edit} />
            </div>
            <div className="col-12 col-md-6">
              <InputForm label={"Phone"} value={phone} setValue={setPhone} disabled={edit} />
            </div>
            <div className="col-12">
              <InputForm label={"Address"} value={address} setValue={setAddress} disabled={edit} />
            </div>
            <div className="col-12">
              <InputForm label={"About"} value={about} setValue={setAbout} disabled={edit} />
            </div>

            {!edit && (
              <div className="col-12 mt-2">
                <label className="form-label text-muted small mb-1">Select Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="form-control form-control-sm"
                />
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top">
            <button
              className="btn btn-primary btn-sm px-4 fw-semibold"
              onClick={() => handleUpdate(doctor?._id)}
              disabled={edit}
            >
              UPDATE DOCTOR
            </button>
            {doctor?.available ? (
              <button
                className="btn btn-outline-danger btn-sm px-4 fw-semibold"
                onClick={() =>
                  handleUpdateStatus(doctor?._id, { availabeStatus: "false" })
                }
              >
                MARK AS Un-Available
              </button>
            ) : (
              <button
                className="btn btn-outline-success btn-sm px-4 fw-semibold"
                onClick={() =>
                  handleUpdateStatus(doctor?._id, { availabeStatus: "true" })
                }
              >
                MARK AS Available
              </button>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default DoctorDetails;