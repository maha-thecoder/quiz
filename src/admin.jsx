import React, { useState } from "react";
import { auth, db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import './admin.css'
import { useNavigate } from "react-router-dom";


export default function Admin() {

    const Navigate=useNavigate()

  const [userdata, setuserdata] = useState({
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    ans:"",
    uploaded: Timestamp.now(),
  });

  const handleChange = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const formsubmit = async (e) => {
    e.preventDefault();
    const { question, opt1, opt2, opt3, opt4, ans } = userdata;

    try {
      await addDoc(collection(db, "question-details"), {
        userid: auth.currentUser.uid,
        question: question,
        opt1: opt1,
        opt2: opt2,
        opt3: opt3,
        opt4: opt4,
        ans:ans,
        uploaded: Timestamp.now(),
      });

      alert("Question added successfully!");
      setuserdata({ question: "", opt1: "", opt2: "", opt3: "", opt4: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="admin-body">
    <div className="admin-container">
      <h2 className="form-title">Add a New Question</h2>
      <form onSubmit={formsubmit} className="admin-form">
        <input
          type="text"
          name="question"
          placeholder="Enter question"
          value={userdata.question}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="opt1"
          placeholder="Option 1"
          value={userdata.opt1}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="opt2"
          placeholder="Option 2"
          value={userdata.opt2}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="opt3"
          placeholder="Option 3"
          value={userdata.opt3}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="opt4"
          placeholder="Option 4"
          value={userdata.opt4}
          onChange={handleChange}
          className="input-field"
          required
        />

<input
          type="text"
          name="ans"
          placeholder="answer"
          value={userdata.ans}
          onChange={handleChange}
          className="input-field"
          required
        />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
    <div className="btn">
    <button className="btnn" onClick={() => Navigate('/quiz')}>take test now</button>

      </div>
    </div>
  );
}
