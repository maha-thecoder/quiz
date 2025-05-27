import React, { useEffect, useState } from "react";
import "./quiz.css";
import { db ,auth} from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { addDoc, Timestamp } from "firebase/firestore";


export default function Quiz({userid}) {

  
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem("currentquestion");
    const parsed = parseInt(saved, 10);
    return Number.isInteger(parsed) ? parsed : 0;
  });
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
  const stateq=questions
  const q = questions[current];

  useEffect(() => {
    if(!userid) return;
    const loadQuestions = async () => {
      try {
        const snapshot = await getDocs(collection(db,'users',userid,'admin-questions'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setLoading(false);
      }
    };

    loadQuestions();
  }, [userid]);

  console.log(questions)
  useEffect(() => {
    localStorage.setItem("currentquestion", current);
    localStorage.setItem("userselected", JSON.stringify(selectAns));
    setSelected(selectAns[current] || null);
  }, [current, selectAns]);

  const handleOptionClick = (opt) => {
    setSelected(opt);
    setSelectAns((prev) => ({
      ...prev,
      [current]: opt,
    }));
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach((quest, index) => {
      if (quest.ans === selectAns[index]) total++;
    });
    setScore(total);
  };

  const handleFinalSubmit = async() => {
    try{
    calculateScore();
    //await storeusermark(score);
    startLoadingAnimation();
    setShowSubmitModal(false);
    
    }
    catch(err){
      console.log(err)
    }
    finally{
      history('/result',{ state: {score,stateq } })}

      
      
    
    // You can add a function here to send data to Firestore if needed
  };

  const storeusermark=async(finalscore)=>{
    
    if(!auth.currentUser) return;

    try{
        await addDoc(collection(db,'quiz-scores'),{
            userid:auth.currentUser.uid,
            name:auth.currentUser.displayName || "anonymus",
            score:finalscore,
            timestamp:Timestamp.now()

        })
    }
    catch(err){
        console.log(err)
    }

}


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
    localStorage.removeItem('currentquestion')
    localStorage.removeItem('userselected')
    setCurrent(0)
    setSelectAns({})
    setSelected(null)

  }

  return (
    <div className="reset">
            <button className="reset-btn" onClick={reset} >Reset</button>

    <div className="quiz-container">

      


      
      <h2 className="question">{current + 1}. {q.question}</h2>

      <div className="options">
        {[q.opt1, q.opt2, q.opt3, q.opt4].map((opt, index) => (
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
            if (current === questions.length - 1) {
              setShowSubmitModal(true);
            } else {
              next();
            }
          }}
        >
          {current === questions.length - 1 ? "Submit" : "Next"}
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
