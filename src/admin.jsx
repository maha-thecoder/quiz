import React, { useEffect, useState } from "react";
import {  Timestamp } from "firebase/firestore";
import './admin.css'
import { useNavigate } from "react-router-dom";


export default function Admin() {

    const Navigate=useNavigate()
    const [isdisabled, setisdisabled] = useState(false);
    

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
    setisdisabled(true); 
    if (!userdata.question || !userdata.opt1 || !userdata.opt2 || !userdata.opt3 || !userdata.opt4) {
      alert("Please fill in all fields");
      setisdisabled(false); 
      return;
    }
    const { question, opt1, opt2, opt3, opt4, ans } = userdata;

    try {

      let newquestion={
        question,opt1,opt2,opt3,opt4,ans
      }
    

      const existingdata=JSON.parse(localStorage.getItem('question')) || []
      if (Array.isArray(existingdata)){
      existingdata.push(newquestion)
          localStorage.setItem('question',JSON.stringify(existingdata))
}
      else{
  localStorage.setItem('question',JSON.stringify([newquestion]))
      }


      setuserdata({ question: "", opt1: "", opt2: "", opt3: "", opt4: "",ans:"" });
      setisdisabled(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      setisdisabled(false);
    }
  };

  

  return (
    <div>
      

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
        <button type="submit" className="submit-btn" disabled={isdisabled}>
          {isdisabled ? "adding..." : "add question"}
        </button>
      </form>
       
    </div>
    <div className="prev-btn">
  <button className="prev-button" onClick={() => Navigate("/finalpre")}>
    Show Test Preview
  </button>
</div>
     
    </div>
    </div>
  );
}
