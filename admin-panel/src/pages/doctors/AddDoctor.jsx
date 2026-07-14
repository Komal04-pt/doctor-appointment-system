import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addDoctor } from "../../redux/actions/doctorActions";
import { reset } from "../../redux/slice/doctorSlice";
import InputForm from "../../components/Forms/InputForm";
import InputSelect from "../../components/Forms/InputSelect";
import "./AllDoctors.css";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [speciality, setSpeciality] = useState("");
  const [experience, setExperience] = useState("");
  const [degree, setDegree] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state se data select karna
  const { success, error, loading } = useSelector((state) => state.doctor);

  // Component mount hote hi purani state reset karna
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // Form submit aur validation handler
  const handleAddDoctor = () => {
    if (
      !name ||
      !email ||
      !about ||
      !speciality ||
      speciality === "Select Speciality" ||
      !fees ||
      !experience ||
      !degree ||
      !address ||
      !phone ||
      !image ||
      !gender ||
      gender === "Select Gender"
    ) {
      return toast.error("Please provide all fields");
    }

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

    dispatch(addDoctor(formData));
  };

  // Success aur Error handling block
  useEffect(() => {
    if (success) {
      toast.success("Doctor Created Successfully!");
      dispatch(reset()); // Navigate karne se pehle Redux state clear karein
      navigate("/all-doctors");
    }
    
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch, navigate]);

  return (
    <Layout>
      <div className="doctors-header">
        <div>
          <h2>Add New Doctor</h2>
          <p>Fill in the doctor's details to add them to the system.</p>
        </div>
        <button
          className="add-doctor-btn"
          onClick={() => navigate("/all-doctors")}
        >
          ← Go Back
        </button>
      </div>

      <div className="p-3" style={{ maxWidth: "600px" }}>
        <InputForm label={"Name"} value={name} setValue={setName} />
        <InputForm label={"Email"} value={email} setValue={setEmail} />
        <InputForm label={"Degree"} value={degree} setValue={setDegree} />

        <InputSelect
          label={"Speciality"}
          value={speciality}
          setValue={setSpeciality}
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
            "Oncology",
            "Gastroenterology",
            "Nephrology",
            "Urology",
            "Pulmonology",
            "Endocrinology",
            "ENT Specialist",
          ]}
        />

        <InputSelect
          label={"GENDER"}
          value={gender}
          setValue={setGender}
          options={["Select Gender", "Male", "Female"]}
        />
        
        <InputForm
          label={"Experience"}
          value={experience}
          setValue={setExperience}
        />
        <InputForm label={"Fees"} value={fees} setValue={setFees} />
        <InputForm label={"About"} value={about} setValue={setAbout} />
        <InputForm label={"Phone"} value={phone} setValue={setPhone} />
        <InputForm label={"Address"} value={address} setValue={setAddress} />
        
        <div className="mb-3">
          <label htmlFor="form-label">Select Image File : </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-control"
          />
        </div>
        
        <button
          className="btn btn-primary"
          onClick={handleAddDoctor}
          disabled={loading}
        >
          {loading ? "Adding..." : "ADD NEW DOCTOR"}
        </button>
      </div>
    </Layout>
  );
};

export default AddDoctor;