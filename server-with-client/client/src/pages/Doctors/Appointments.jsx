import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DoctorData from "./DoctorsData.json";
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

  //get date and time
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
    return `${String(hours).padStart(2, "0")}: 
    ${String(minutes).padStart(2, "0")}:
    ${String(second).padStart(2, "0")} ${ampm}`;
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
      <div
        className="container docinfo-container"
        style={{ minHeight: "55vh" }}
      >
        <div className="row m-3">
          <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
            <img
              src={
                docInfo?.image ||
                "https://static.thenounproject.com/png/1743561-200.png"
              }
              alt={docInfo?.name || "doctor image"}
              height={200}
              width={200}
              className="img-fluid object-fit-cover"
            />

            <h6 className="mt-2">{docInfo?.name}</h6>
            <h6
              className={`${
                docInfo?.available ? "text-success" : "text-danger"
              }`}
            >
              {docInfo?.available ? "Available" : "Not Available"}
            </h6>
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center m-3">
            <h6>Experience: {docInfo?.experience} Year's</h6>
            <h6>About Doctor :</h6>
            <p>{docInfo?.about}</p>
            <h5>Consultation Fee : {docInfo?.fees}</h5>
            {/* date time */}
            <div className="date-time mt-3">
              <h6 className="">Select Your Booking Date & Time : 👇 </h6>
              <DatePicker
                className="calender"
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
              />
              <p>
                Your Selected Booking :{" "}
                {selectedDateTime
                  ? selectedDateTime.toLocaleString()
                  : "Please Select a date & Time"}
              </p>
            </div>

            {}
            <div className="d-flex gap-3 mt-3">
              <button
                className="btn btn-success"
                onClick={() => handleBooking("online")}
                disabled={!docInfo?.available || bookingStage !== "idle"}
              >
                {bookingStage !== "idle" &&
                bookingStage !== "bookingCashOnly"
                  ? "Processing..."
                  : "Pay Online"}
              </button>

              <button
                className="btn btn-outline-primary"
                onClick={() => handleBooking("cash")}
                disabled={!docInfo?.available || bookingStage !== "idle"}
              >
                {bookingStage === "bookingCashOnly"
                  ? "Processing..."
                  : "Pay at Hospital (Cash)"}
              </button>
            </div>

            {!docInfo?.available && (
              <p className="text-danger mt-2">Doctor Not Available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;