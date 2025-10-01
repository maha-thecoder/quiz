import React, { useEffect, useState } from "react";
import "./quiz.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function Quiz({userid}) {

  const {testname}=useParams()
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [selectAns, setSelectAns] = useState(() => {
    try {
      const user = localStorage.getItem("userselected");
      return user && user !== "undefined" ? JSON.parse(user) : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  });
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [loadingAnim, setLoadingAnim] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);

  const history=useNavigate()

  


  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : 'https://quiz-backend-x32j.onrender.com';
  const getques = await axios.get(`${API_BASE_URL}/api/v1/quizopt/quiz/${testname}`)
  

        console.log(getques.data)
       
        setQuestions(getques.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  console.log(questions)
  useEffect(() => {
    localStorage.setItem("userselected", JSON.stringify(selectAns));
    setSelected(selectAns[current] || null);
  }, [ selectAns]);

  const handleOptionClick = (opt) => {
    setSelected(opt);
    setSelectAns((prev) => ({
      ...prev,
      [current]: opt,
    }));
  };

  const next = () => {
    if (current < questions[0].questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

 

  const handleFinalSubmit = async() => {
    try{
    
      const totalscore=questions[0].questions.reduce((total,quest,index)=>{
        const dbans=quest.ans?.trim().toLowerCase()
        const choosenans=selectAns[index].trim().toLowerCase()
        return total +(dbans==choosenans?1:0)

      },0)

      setScore(totalscore)


    history('/result', { state: { score: totalscore, stateq: questions[0].questions } });

   
    startLoadingAnimation();
    setShowSubmitModal(false);
    
    }
  catch(err){
    console.log(err)
  }
}

    console.log(score)
   

 

  const startLoadingAnimation = () => {
    setLoadingAnim(true);
    setLoadingPercent(0);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      setLoadingPercent(progress);
      if (progress >= 98) {
        clearInterval(interval);
        setTimeout(() => setLoadingAnim(false), 1500);
      }
    }, 700);
  };

  const loadingMessage = () => {
    if (loadingPercent < 20) return <p>Sending credentials to database...</p>;
    if (loadingPercent < 50) return <p>Adding credentials...</p>;
    if (loadingPercent < 90) return <p>Almost there, please be patient...</p>;
    return <p>Finalizing...</p>;
  };

  if (loading) return <div>Loading questions...</div>;
  if (questions.length === 0) return <div>No questions available.</div>;

  const reset=()=>{
    localStorage.removeItem('userselected')
    setCurrent(0)
    setSelectAns({})
    setSelected(null)

  }


  return (
    <div className="reset">
            <button className="reset-btn" onClick={reset} >Reset</button>

    <div className="quiz-container">

      


      
      <h2 className="question">{current + 1}. {questions[0].questions[current].question}</h2>

      <div className="options">
        {questions[0].questions[current].opt.map((opt, index) => (
          <button
            key={index}
            className={`option-btn ${selected === opt ? "selected" : ""}`}
            onClick={() => handleOptionClick(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="nav-buttons">
        <button onClick={prev} disabled={current === 0}>Previous</button>
        <button
          onClick={() => {
            if (current === questions[0].questions.length - 1) {
              setShowSubmitModal(true);
            } else {
              next();
            }
          }}
        >
          {current === questions[0].questions.length - 1 ? "Submit" : "Next"}
        </button>

      </div>
      
      

      {showSubmitModal && (
        <div className="submit-modal">
          <div className="modal-content">
            <div className="modal-close" onClick={() => setShowSubmitModal(false)}>❌</div>
            <p>
              Check all answers before proceeding to submit. Once submitted, no edits are possible.
            </p>
            <button className="btn btn-warning" onClick={handleFinalSubmit}>Submit</button>
          </div>
        </div>
        
      )}

      {loadingAnim && (
        <div className="loading-screen">
          <div className="loading-box">
            <h4>Submitting your answers...</h4>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${loadingPercent}%` }}></div>
            </div>
            {loadingMessage()}
          </div>
        </div>
      )}
    </div>
    </div>

  );
}
