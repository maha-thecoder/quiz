import React from "react";
import './mainpage.css'
import { useNavigate } from "react-router-dom";



export default function Mainpage(){

    const history=useNavigate()
    return(
        <div>
            <div className="video-jpg">
            <video  src="/Online Quiz.mp4" autoPlay loop muted playsInline />
            <p>"Each quiz is a step toward knowledge — start your journey now!</p>
            </div>

            <div className="video-jpg">
            <p>Not just a test — it's a chance to discover how much you know and how much more you can.</p>
            <video  src="/Quiz Sheet.mp4" autoPlay loop muted playsInline />

            </div>
            <div className="quiz-align">
                <p className="box" onClick={()=>history('/pre-admin')} >Prepare Test</p>
                <p className="box">Prepare Quiz</p>
                <p className="box" onClick={()=>history('/quiz')}>Take Test</p>
                <p className="box">Group QUIZ</p>
            </div>

            <div className="instruction">
                
                <h1>How To Use ?</h1>
                <div className="warn">
                    <div>
                    <h3>📘 Read the Instruction Manual Carefully </h3>
                    <strong>Before building your quiz masterpiece, take a moment to go through the steps below. Each one is important — just like reading the instructions before assembling a new house</strong>
                    </div>
                <video src="/Business woman talks about how to use and maintain it.mp4" autoPlay loop muted playsInline/>
                </div>
            </div>

            <div className="steps">
                <h3>1.Click on “Create Test”</h3>
                <p>Start your journey by clicking on the “Create Test” button from the main page</p>
                <h3>2.Set the Duration ⏱️</h3>
                <p>Choose how many minutes the test should last. This will determine the test's countdown timer.</p>
                <h3>3.Add Your Questions 📝</h3>
                <p>Type your question in the provided question box</p>
                <h3>Enter the Options ✅❌</h3>
                <p>.Fill in four options for your question in the respective Option 1 - Option 4 fields</p>
                <p>.Make sure each option is clear and unique!</p>
                <h3>5.Mark the Correct Answer 🎯</h3>
                <p>In the Answer box, type the correct answer exactly as it appears in one of the options</p>
                <h3>6.Repeat for More Questions 🔁</h3>
                <p>You can keep adding as many questions as you like by clicking “Add Another Question” (if available).</p>
                <h3>Finish the Setup 🚀</h3>
                <p>..When done, click “Done” to save your test.</p>
                <p>..You can also click “Preview” to check how your test looks before sharing or taking it.</p>
            </div>

        </div>
    )
}