import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, isToday } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetails } from "../../redux/actions/doctorActions";
import {
  bookAppointment,
  createPaymentOrder,
  verifyPayment,
} from "../../redux/actions/authActions";
import toast from "react-hot-toast";
import { reset } from "../../redux/slice/authSlice";

const Appointments = () => {
  const { id } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);

  const { doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (doctor) {
      setDocInfo(doctor);
    }
  }, [doctor]);

  const extractDate = (dtaeObj) => {
    const day = String(dtaeObj.getDate()).padStart(2, "0");
    const month = String(dtaeObj.getMonth() + 1).padStart(2, "0");
    const year = dtaeObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const extractTime = (ObjectTime) => {
    let hours = ObjectTime.getHours();
    const minutes = ObjectTime.getMinutes();
    const second = ObjectTime.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(second).padStart(2, "0")} ${ampm}`;
  };

  const getMinTime = () => {
    if (isToday(selectedDateTime)) {
      return new Date();
    }
    return setHours(setMinutes(new Date(), 0), 10);
  };

  const getMaxTime = () => {
    return setHours(setMinutes(new Date(), 0), 22);
  };

  const { success, error, user, appointment, razorpayOrder, paymentSuccess } =
    useSelector((state) => state.auth);

  const [bookingStage, setBookingStage] = useState("idle");

  const handleBooking = (paymentMode) => {
    const bookingData = {
      userId: user?._id,
      doctorId: id,
      amount: docInfo?.fees,
      slotDate: extractDate(selectedDateTime),
      slotTime: extractTime(selectedDateTime),
    };

    if (paymentMode === "cash") {
      setBookingStage("bookingCashOnly");
    } else {
      setBookingStage("booking");
    }

    dispatch(bookAppointment(bookingData));
  };

  useEffect(() => {
    if (success && bookingStage === "bookingCashOnly" && appointment?._id) {
      dispatch(reset());
      toast.success("Booking Successful! Please pay at the hospital.");
      setBookingStage("idle");
      navigate("/user/appointments");
    }
  }, [success, bookingStage, appointment, dispatch, navigate]);

  useEffect(() => {
    if (success && bookingStage === "booking" && appointment?._id) {
      dispatch(reset());
      dispatch(createPaymentOrder(appointment._id));
      setBookingStage("orderCreated");
    }
  }, [success, bookingStage, appointment, dispatch]);

  useEffect(() => {
    if (success && bookingStage === "orderCreated" && razorpayOrder) {
      dispatch(reset());
      openRazorpayCheckout();
      setBookingStage("paying");
    }
  }, [success, bookingStage, razorpayOrder]);

  const openRazorpayCheckout = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "CR Global Hospital",
      description: "Appointment Booking Payment",
      order_id: razorpayOrder.id,
      handler: function (response) {
        dispatch(
          verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            appointmentId: appointment._id,
          })
        );
      },
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled. Your slot is booked but unpaid.");
          setBookingStage("idle");
        },
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },
      theme: {
        color: "#0f766e",
      },
    };

    const razorpayObject = new window.Razorpay(options);
    razorpayObject.open();
  };

  useEffect(() => {
    if (paymentSuccess) {
      toast.success("Payment Successful! Appointment Confirmed.");
      dispatch(reset());
      setBookingStage("idle");
      navigate("/user/appointments");
    }
  }, [paymentSuccess, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(reset());
      setBookingStage("idle");
    }
  }, [dispatch, error]);

  return (
    <>
      <div className="container py-4 px-3" style={{ minHeight: "60vh" }}>
        <div className="row justify-content-center border rounded-3 p-3 p-sm-4 bg-white shadow-sm mx-1">
          
          <div className="col-12 col-md-4 d-flex flex-column align-items-center text-center border-end-md pb-3 pb-md-0">
            <div className="w-40 h-40 overflow-hidden rounded-circle border border-2 shadow-sm mb-3" style={{ width: "130px", height: "130px" }}>
              <img
                src={docInfo?.image || "https://static.thenounproject.com/png/1743561-200.png"}
                alt={docInfo?.name || "doctor image"}
                className="w-full h-full object-fit-cover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h6 className="fw-bold mb-1 text-dark text-sm">{docInfo?.name}</h6>
            <span className={`badge ${docInfo?.available ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"} px-2.5 py-1 text-xs fw-semibold`}>
              {docInfo?.available ? "Available" : "Not Available"}
            </span>
          </div>

          <div className="col-12 col-md-8 text-start ps-md-4 pt-3 pt-md-0">
            <div className="small text-muted mb-2">
              <span className="fw-semibold text-dark">Experience:</span> {docInfo?.experience} Year's
            </div>
            <div className="mb-3">
              <span className="fw-semibold text-dark small d-block mb-1">About Doctor:</span>
              <p className="text-secondary small leading-relaxed mb-0">{docInfo?.about}</p>
            </div>
            <h6 className="fw-bold text-dark mb-3 text-sm">
              Consultation Fee : <span className="text-teal-700">₹{docInfo?.fees}</span>
            </h6>
            
            <div className="date-time p-3 bg-light rounded-3 border">
              <h6 className="small fw-semibold text-dark mb-2">Select Your Booking Date & Time : 👇</h6>
              <div className="w-100 mb-2">
                <DatePicker
                  className="form-control form-control-sm border-teal-600 text-center"
                  minDate={new Date()}
                  selected={selectedDateTime}
                  onChange={(date) => setSelectedDateTime(date)}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={30}
                  dateFormat={"d-MMMM-yyyy h:mm aa"}
                  timeCaption="Time"
                  minTime={getMinTime()}
                  maxTime={getMaxTime()}
                  wrapperClassName="w-100"
                />
              </div>
              <p className="text-muted m-0" style={{ fontSize: "12px" }}>
                <strong>Selected Slot:</strong>{" "}
                {selectedDateTime ? selectedDateTime.toLocaleString() : "Please Select a date & Time"}
              </p>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button
                className="btn btn-success btn-sm px-3 flex-grow-1 flex-sm-grow-0 fw-medium"
                onClick={() => handleBooking("online")}
                disabled={!docInfo?.available || bookingStage !== "idle"}
              >
                {bookingStage !== "idle" && bookingStage !== "bookingCashOnly" ? "Processing..." : "Pay Online"}
              </button>

              <button
                className="btn btn-outline-primary btn-sm px-3 flex-grow-1 flex-sm-grow-0 fw-medium"
                onClick={() => handleBooking("cash")}
                disabled={!docInfo?.available || bookingStage !== "idle"}
              >
                {bookingStage === "bookingCashOnly" ? "Processing..." : "Pay at Hospital (Cash)"}
              </button>
            </div>

            {!docInfo?.available && (
              <p className="text-danger small fw-medium mt-2 mb-0">Doctor is currently not accepting bookings.</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Appointments;