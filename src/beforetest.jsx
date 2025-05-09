import React, { useState } from "react";
import './beforetest.css';
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Beforetest() {

  const history = useNavigate();

  const [namsubject, setnamsubject] = useState([]);
  const [time, settime] = useState({
    time: 0,
    sub: 0
  });

  const dbupdating = async () => {
    for (const i of namsubject) {
      try {
        await addDoc(collection(db, 'sub-details'), {
          name: i.name,
          marks: i.marks,
          time: time.time
        });
        alert('Data submitted successfully!');
      } catch (err) {
        console.log(err);
      }
    }
  };

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

        <div className="submit-btn" onClick={dbupdating}>
          Submit
        </div>
      </form>

      <div className="next-btn" onClick={() => history('/admin')}>
        Next
      </div>
    </div>
  );
}
