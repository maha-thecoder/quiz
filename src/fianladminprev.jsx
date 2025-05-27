import React from "react";
import './fianladminprev.css';
import { db } from "./firebase";
import { auth } from "./firebase";
import { collection, addDoc } from "firebase/firestore";



export default function Finaladminprev() {
    const userid=auth.currentUser.uid

    const time = JSON.parse(localStorage.getItem('time'));
    const subject = JSON.parse(localStorage.getItem('subject'));
    const nosub = JSON.parse(localStorage.getItem('no-sub'));
    const questions= JSON.parse(localStorage.getItem('question'));
    const fianlsub = async () => {
        try{
            for(const i of subject) {
                await addDoc(collection(db,'users',userid, 'sub-details',), {
                    name: i.name,
                    marks: i.marks,
                    time: time,
                    userid: userid
                });
            }
            for (const i of questions) {
                await addDoc(collection(db,'users',userid,'admin-questions'), {
                    question: i.question,
                    opt1: i.opt1,
                    opt2: i.opt2,
                    opt3: i.opt3,
                    opt4: i.opt4,
                    ans: i.ans,
                    userid:userid,
                });
            }
            console.log(questions)
            localStorage.removeItem('question')
           
        }

    


        catch (err) {
            console.error("Error adding document: ", err);
        }
        finally{
            alert("Test Created Successfully");
            
        }
    }

    console.log(subject);
    console.log(nosub);
    console.log(questions)
    return (
        <div className="preview-container">
            <h1 className="preview-title">📝 Test Instructions Preview</h1>

            <div className="instructions-box">
                <h2 className="instructions-heading">📖 Instructions for Students</h2>
                <ul className="instructions-list">
                    <li>Read all questions carefully before answering.</li>
                    <li>Ensure a stable internet connection during the test.</li>
                    <li>You will have <strong>{time}</strong> minutes to complete the test.</li>
                    <li>Each subject has individual marks. Attempt all subjects in order.</li>
                    <li>Do not refresh or close the browser tab once the test begins.</li>
                    <li>Your answers will be auto-submitted when the timer ends.</li>
                    <li>Be honest and try your best. Good luck!</li>
                </ul>
            </div>

            <div className="test-info">
                <h3 className="test-duration">🕒 Total Duration: {time} minutes</h3>
                <h3 className="subject-count">📚 Total Subjects: {nosub}</h3>
            </div>

            <h2 className="section-heading">Subjects & Marks:</h2>

            <div className="subject-list">
                {
                    subject.map((item, index) => (
                        <div key={index} className="subject-item">
                            <h3 className="subject-name">Subject {index + 1}: {item.name}</h3>
                            <h3 className="subject-marks">Marks: {item.marks}</h3>
                        </div>
                    ))
                }
            </div>
            <div className="start-button-container">
  <button className="start-test-button" onClick={fianlsub}>
    🚀 submit QUIZ
  </button>
</div>
        </div>
    );
}


