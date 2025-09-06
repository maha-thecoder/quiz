import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import "./admin.css";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    opt:["","","",""],
   
    ans: "",
    uploaded: Timestamp.now(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const optchange=(optindex,value)=>{
    setFormData(prev=>{
      const updated=[...prev.opt]
      updated[optindex]=value
      return {...prev,opt:updated}
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    const { question,opt, ans } = formData;

    if (!question || opt.some(option=>option.trim()==="") || !ans) {
      alert("Please fill in all fields.");
      setIsDisabled(false);
      return;
    }

    try {
      const newQuestion = { question, opt, ans };
      const existingData = JSON.parse(localStorage.getItem("question")) || [];

      if (Array.isArray(existingData)) {
        existingData.push(newQuestion);
        localStorage.setItem("question", JSON.stringify(existingData));
      } else {
        localStorage.setItem("question", JSON.stringify([newQuestion]));
      }

      setFormData({
        question: "",
        opt:["","","",""],
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
         {
          formData.opt.map((option,i)=>(
            <input
            key={i}
            name="opt"
            placeholder={`option ${i+1}`}
            value={option}
            onChange={(e)=>optchange(i,e.target.value)}
            className="input-field"
            />
          ))
         }
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