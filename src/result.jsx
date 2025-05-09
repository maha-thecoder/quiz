import React from "react";
import { useLocation } from "react-router-dom";
import './result.css';

export default function Result() {
  const location = useLocation();
  const ans = location.state?.ans || {};
  const score = location.state?.score || 0;
  const stateq = location.state?.stateq || [];

  return (
    <div>
      <h1 className="result-heading">RESULT</h1>

      <p className="score-obtain">Nice, you got {score}/10 in the quiz</p>

      <p className="guide">Here are the answers for your test</p>

      <div className="out-box">
        {stateq.map((ques, index) => (
          <div className="quesbox" key={index}>
            <p>{ques.question}</p>
            <p className="correct-answer">Ans: {ques.ans || 'Not available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
