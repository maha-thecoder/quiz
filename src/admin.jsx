import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import "./admin.css";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    ans: "",
    uploaded: Timestamp.now(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    const { question, opt1, opt2, opt3, opt4, ans } = formData;

    if (!question || !opt1 || !opt2 || !opt3 || !opt4 || !ans) {
      alert("Please fill in all fields.");
      setIsDisabled(false);
      return;
    }

    try {
      const newQuestion = { question, opt1, opt2, opt3, opt4, ans };
      const existingData = JSON.parse(localStorage.getItem("question")) || [];

      if (Array.isArray(existingData)) {
        existingData.push(newQuestion);
        localStorage.setItem("question", JSON.stringify(existingData));
      } else {
        localStorage.setItem("question", JSON.stringify([newQuestion]));
      }

      setFormData({
        question: "",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        ans: "",
      });
      setIsDisabled(false);
    } catch (error) {
      console.error("Error adding question: ", error);
      setIsDisabled(false);
    }
  };

  return (
    <div className="admin-body">
      <div className="admin-container">
        <h2 className="form-title">Add a New Question</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            name="question"
            placeholder="Enter question"
            value={formData.question}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="opt1"
            placeholder="Option 1"
            value={formData.opt1}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="opt2"
            placeholder="Option 2"
            value={formData.opt2}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="opt3"
            placeholder="Option 3"
            value={formData.opt3}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="opt4"
            placeholder="Option 4"
            value={formData.opt4}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="ans"
            placeholder="Answer"
            value={formData.ans}
            onChange={handleChange}
            className="input-field"
            required
          />
          <button type="submit" className="submit-btn" disabled={isDisabled}>
            {isDisabled ? "Adding..." : "Add Question"}
          </button>
        </form>
      </div>
      <div className="prev-btn">
        <button className="prev-button" onClick={() => navigate("/finalpre")}>
          Show Test Preview
        </button>
      </div>
    </div>
  );
}