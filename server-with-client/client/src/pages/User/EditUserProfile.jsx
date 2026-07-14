import React, { useEffect, useState } from "react";
import "./User.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../redux/actions/authActions";
import toast from "react-hot-toast";
import { reset } from "../../redux/slice/authSlice";

const EditUserProfile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  const { user, success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setPhone(user?.phone || "");
      setGender(user?.gender || "");
      setDob(user?.dob || "");
      setAddress(user?.address || "");
      setImage(user?.image || "");
    }
  }, [user]);

  const handleUpdate = (id) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("gender", gender);
    formData.append("dob", dob);
    dispatch(reset());
    dispatch(updateUserData({ id, formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success("user Updated!");
      dispatch(reset());
      onClose();
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, success, error, onClose]);

  const renderUserImage = () => {
    if (image && typeof image !== "string") {
      return URL.createObjectURL(image);
    }
    if (user?.image) {
      return `data:image/jpeg;base64,${user.image}`;
    }
    return "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="editModal modal d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "450px" }}>
          <div className="modal-content">
            <div className="modal-header py-2">
              <h6 className="modal-title fw-bold">Edit Your Profile</h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body py-3">
              <div className="mod-details d-flex flex-column gap-2">
                
                <div className="text-center mb-1">
                  <img
                    src={renderUserImage()}
                    alt="userPic"
                    height={100}
                    width={100}
                    style={{ objectFit: "cover", borderRadius: "50%", border: "2px solid #ccc" }}
                  />
                </div>
                
                <input
                  type="file"
                  className="form-control form-control-sm"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="d-flex gap-2">
                  <select
                    className="form-select form-select-sm"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  
                  <input 
                    type="date" 
                    className="form-control form-control-sm"
                    placeholder="dob"  
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer py-1">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => handleUpdate(user?._id)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;