import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessages,
  replyToMessage,
  deleteMessage,
} from "../../redux/actions/messageAction";
import { reset } from "../../redux/slice/messageSlice";
import toast from "react-hot-toast";
import "./AllMessages.css";

const AllMessages = () => {
  const dispatch = useDispatch();
  const { messages, success, error } = useSelector((state) => state.message);
  const [replyBoxId, setReplyBoxId] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    dispatch(reset());
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Action completed successfully");
      dispatch(reset());
      dispatch(getAllMessages());
      setReplyBoxId(null);
      setReplyText("");
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch]);

  const handleReplySubmit = (id) => {
    if (!replyText.trim()) {
      return toast.error("Please write a reply before sending");
    }
    dispatch(replyToMessage({ id, adminReply: replyText }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteMessage(id));
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case "Feedback":
        return "type-feedback";
      case "Complaint":
        return "type-complaint";
      case "Enquiry":
      default:
        return "type-enquiry";
    }
  };

  return (
    <Layout>
      <div className="messages-header">
        <div>
          <h2>All Messages</h2>
          <p>{messages?.length || 0} total messages</p>
        </div>
      </div>

      {messages?.length > 0 ? (
        messages.map((msg) => (
          <div className="message-card" key={msg._id}>
            <div className="message-card-top">
              <div>
                <h5 className="message-name">
                  {msg?.name}{" "}
                  <span className={`type-badge ${getTypeBadgeClass(msg?.type)}`}>
                    {msg?.type || "Enquiry"}
                  </span>
                  <span
                    className={`status-badge ${
                      msg?.status === "resolved"
                        ? "status-resolved"
                        : "status-pending"
                    }`}
                  >
                    {msg?.status === "resolved" ? "Resolved" : "Pending"}
                  </span>
                </h5>
                <p className="message-contact">Contact: {msg?.contact}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(msg._id)}
              >
                Delete
              </button>
            </div>

            <p className="message-text">{msg?.message}</p>

            {msg?.adminReply && (
              <div className="admin-reply-box">
                <strong>Your Reply:</strong>
                <p>{msg.adminReply}</p>
              </div>
            )}

            {replyBoxId === msg._id ? (
              <div className="reply-form">
                <textarea
                  rows={2}
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="reply-form-actions">
                  <button
                    className="send-reply-btn"
                    onClick={() => handleReplySubmit(msg._id)}
                  >
                    Send Reply
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setReplyBoxId(null);
                      setReplyText("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="reply-btn"
                onClick={() => {
                  setReplyBoxId(msg._id);
                  setReplyText(msg?.adminReply || "");
                }}
              >
                {msg?.adminReply ? "Edit Reply" : "Reply"}
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-muted mt-5">No messages found.</p>
      )}
    </Layout>
  );
};

export default AllMessages;