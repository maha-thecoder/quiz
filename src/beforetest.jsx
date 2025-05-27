import React, { useEffect, useState } from "react";
import './beforetest.css';
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Beforetest() {
  const history = useNavigate();
  const [isdisabled, setisdisabled] = useState(false);
  const [namsubject, setnamsubject] = useState([]);
  const [time, settime] = useState({
    time: 0,
    sub: 0
  });

  const dbupdating = async () => {

    if (!time.time || !time.sub) {
      alert("Please fill in all fields");
      return;
    }
    setisdisabled(true); // Disable the 
    

    for(let i=0;i<namsubject.length;i++)
      {
        const subj=namsubject[i]
        if(!subj.name || !subj.marks)
        {
          alert("Please fill in all subject fields");
          setisdisabled(false); // Re-enable the button if validation fails
          return;
        }   

      }

    try {
     

      history('/admin'); // Navigate after successful submission
      console.log('clicked');

    } catch (err) {
      console.error("Error adding document: ", err);
      setisdisabled(false); // Re-enable the button if there's an error
    }
  };

  useEffect(()=>{
    localStorage.setItem('time',JSON.stringify(time.time))
    localStorage.setItem('no-sub',JSON.stringify(time.sub))
    localStorage.setItem('subject',JSON.stringify(namsubject))


  },[time.time,time.sub,namsubject])

  const handlechange = (e) => {
    const { name, value } = e.target;
    const intval = parseInt(value);
    settime({ ...time, [name]: intval });

    if (name === "sub") {
      setnamsubject(Array(intval).fill({ name: '', marks: '' }));
    }
  };

  const handlesubchange = (index, field, value) => {
    const updated = [...namsubject];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setnamsubject(updated);
  };

  const rendersubfield = () => {
    return namsubject.map((_, i) => (
      <div className="subject-group" key={i}>
        <input
          type="text"
          placeholder={`Subject ${i + 1} Name`}
          value={namsubject[i]?.name || ''}
          onChange={(e) => handlesubchange(i, 'name', e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Marks"
          value={namsubject[i]?.marks || ''}
          onChange={(e) => handlesubchange(i, 'marks', e.target.value)}
          className="input-field"
        />
      </div>
    ));
  };

  return (
    <div className="beforetest-container">
      <center><h1 className="main-heading">Welcome to Test Creating Page</h1></center>
      <form onSubmit={(e) => { e.preventDefault(); dbupdating(); }} className="test-form">
        <h3 className="sub-heading">We hope that you will read the instructions before proceeding</h3>

        <p className="input-label">Enter the test duration time (in minutes):</p>
        <input
          type="number"
          name="time"
          value={time.time}
          onChange={handlechange}
          className="input-field"
          required
        />

        <p className="input-label">How many subjects does this test contain?</p>
        <input
          type="number"
          name="sub"
          value={time.sub}
          onChange={handlechange}
          className="input-field"
        />

        <h3 className="sub-heading">Subject Details:</h3>
        {rendersubfield()}

        <button type="submit" className="submit-btn" disabled={isdisabled}>
          {isdisabled ? "Submitting..." : "Next"}
        </button>
      </form>
    </div>
  );
}
