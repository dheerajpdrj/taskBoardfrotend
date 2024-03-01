// AddListModal.js
import React, { useState } from "react";
import "./style.css";

const AddListModal = ({ onAddList, setShowModal }) => {
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!header.trim() || !body.trim()) {
      setError("Header and Body are mandatory fields");
      return;
    }
    const newList = {
      header,
      body: body
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };
    onAddList(newList);
    setHeader("");
    setBody("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="close-icon" onClick={() => setShowModal(false)}>
          ✖
        </div>
        <div className="modal-content">
          <h2>Add New List</h2>
          <input
            type="text"
            value={header}
            onChange={(e) => {
              setHeader(e.target.value);
              setError("");
            }}
            placeholder="Heading"
          />
          <textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setError("");
            }}
            placeholder="Add Tasks.. (Enter items separated by newline)"
          />
          {error && <div className="error-message">{error}</div>}
          <div className="modal-buttons">
            <button className="modal-button" onClick={handleSubmit}>
              Add List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListModal;
