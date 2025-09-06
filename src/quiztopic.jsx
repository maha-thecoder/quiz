import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quiztopic.css"; 

export default function Quiztopic() {
  const [testnames, setTestnames] = useState([]);
  const navigate = useNavigate();

  
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = window.location.hostname === 'localhost'
      ? 'http://localhost:4000'
      : 'https://quiz-indol-six.vercel.app';
    const res = await axios.get(`${API_BASE_URL}/api/v1/quizopt/quiztopic`)
    
        setTestnames(res.data);
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  console.log(testnames)

  const handleClick = (name) => {
    navigate(`/quiz/${name}`); 
  };

  return (
    <div className="quiz-container">
      <h1 className="main-head">Quiz Topics</h1>
      <div className="quiz-grid">
        {testnames.length > 0 ? (
          testnames.map((item, index) => (
            <div
              key={index}
              className="quiz-card"
              onClick={() => handleClick(item.testname)}
            >
              <h2>{item.testname}</h2>
            </div>
          ))
        ) : (
          <p className="loading-text">Loading topics...</p>
        )}
      </div>
    </div>
  );
}
