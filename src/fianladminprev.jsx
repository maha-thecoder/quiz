import React from "react";
import './fianladminprev.css';
import axios from "axios";

export default function Finaladminprev() {
  const time = JSON.parse(localStorage.getItem('time'));
  const subjectData = JSON.parse(localStorage.getItem('subject'));
  const nosub = JSON.parse(localStorage.getItem('no-sub'));
  const testname = JSON.parse(localStorage.getItem('testname'));

  const [questions, setQuestions] = React.useState(
    JSON.parse(localStorage.getItem("question")) || []
  );

 
  console.log(questions)
  const subjectsForSchema = subjectData.map(s => s.name);

  const finalSubmit = async () => {
    try {
      const payload = {
        time: time,
        testname: testname,
        subject: subjectsForSchema,
        questions: questions
      };

      console.log("Sending payload:", payload);

      const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:4000'
  : 'https://quiz-indol-six.vercel.app';
const res = await axios.post(`${API_BASE_URL}/api/v1/quizopt`,payload);

      alert('Data sent successfully');
    } catch (err) {
      console.error("Error adding document: ", err);
    } finally {
      alert("Test Created Successfully");
      localStorage.removeItem(question)
    }
  };

  const handleQuestionChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].question = value;
    setQuestions(updatedQuestions);
    localStorage.setItem("question", JSON.stringify(updatedQuestions));
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].opt[optIndex] = value;
    setQuestions(updatedQuestions);
    localStorage.setItem("question", JSON.stringify(updatedQuestions));
  };

  const handleAnswer = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].ans = value;
    setQuestions(updatedQuestions);
    localStorage.setItem("question", JSON.stringify(updatedQuestions));
  };

  const deleteQuestion = (qIndex) => {
    const updatedQuestions = questions.filter((_, index) => index !== qIndex);
    setQuestions(updatedQuestions);
    localStorage.setItem("question", JSON.stringify(updatedQuestions));
  };

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
        {subjectData.map((item, index) => (
          <div key={index} className="subject-item">
            <h3 className="subject-name">Subject {index + 1}: {item.name}</h3>
            <h3 className="subject-marks">Marks: {item.marks}</h3>
          </div>
        ))}
      </div>

      <h2 className="section-heading">Questions Preview:</h2>
      <div className="main-field">
        {questions.map((q, qi) => (
          <div key={qi} className="question-card">
            <div className="question-header">
              <strong>Question:</strong>
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(qi, e.target.value)}
                className="question-input"
              />
              <button className="btn-remove" onClick={() => deleteQuestion(qi)}>❌ Remove Question</button>
            </div>

            {q.opt.map((option, oi) => (
              <React.Fragment key={oi}>
                <div className="option-row">
                  <strong>{`Opt ${oi + 1}`}</strong>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(qi, oi, e.target.value)}
                    className="option-input"
                  />
                </div>
              </React.Fragment>
            ))}

            <div className="answer-row">
              <strong>Answer:</strong>
              <input
                type="text"
                value={q.ans}
                onChange={(e) => handleAnswer(qi, e.target.value)}
                className="answer-input"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="start-button-container">
        <button className="start-test-button" onClick={finalSubmit}>
          🚀 Submit QUIZ
        </button>
      </div>
    </div>
  );
}
