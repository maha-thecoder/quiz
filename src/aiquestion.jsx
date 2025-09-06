import React, { useEffect, useState } from 'react';
import './aiquestion.css';
import { useNavigate } from 'react-router-dom';

export default function AiQuestion() {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const history=useNavigate();
  const [aires, setAires] = useState('');
  const [userQues, setUserQues] = useState({
    quizname:"",
    question: "",
    no_ques:""
  });

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setUserQues((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDmuUsYAYbtqsJvqAbvRkk4l6crOOH3QeY";

    const requestBody = {
      contents: [
        {
          parts: [{
            text: `Generate ${userQues.no_ques} multiple-choice questions on the topic ${userQues.question}.

Format the output like this exactly:

Question: [question text]
A. [option 1]
B. [option 2]
C. [option 3]
D. [option 4]
Answer: [Correct option letter]

Repeat this format for each question.`
          }],
        }
      ]
    };

   
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const generated=data.candidates[0].content.parts[0].text
        history('/ai-response',{
        state: { aires:generated,quizname:userQues.quizname }
      });
      } else {
        setAires("No valid response.");
      }
    } catch (err) {
      console.error(err);
      setAires("Error generating response.");
    }
  }

  

  return (
    <div>
    <div className="ai-container">
      <header className="ai-header">
        <h1>AI Question Generator</h1>
        <p className="subtitle">
          Create multiple-choice questions in seconds. Enhance your learning, teaching, or quiz-building process using cutting-edge AI.
        </p>
      </header>

      <section className="ai-form-section">
        <form onSubmit={handleSubmit} className="ai-form">

        <input
            type="text"
            name='quizname'
            placeholder="Enter Quiz Name"
            value={userQues.quizname}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name='no_ques'
            placeholder="Enter number of questions.."
            value={userQues.no_ques}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name='question'
            placeholder="Enter a topic to fetch questions(e.g., Quantum Physics, React Basics)"
            value={userQues.question}
            onChange={handleChange}
            required
          />
          <button type="submit">Generate Questions</button>
        </form>
      </section>

      {aires && (
        <section className="ai-response-section">
          <h2>Generated Questions</h2>
          <pre>{aires}</pre>
        </section>
      )}
      

      <section className="ai-how-to-use">
        <h2>How It Works</h2>
        <ol>
          <li>Type in a topic you're interested in.</li>
          <li>Click <strong>"Generate Questions"</strong>.</li>
          <li>Get 3 formatted MCQs generated instantly by AI.</li>
        </ol>
       
          Use this tool for:
          <ul>
            <li>Creating study material</li>
            <li>Testing students’ understanding</li>
            <li>Building practice questions for exams</li>
          </ul>
       
      </section>

      <section className="ai-about">
        <h2>Why Use AI for Question Generation?</h2>
        <p>
          Traditional question-making is time-consuming. With AI, you can generate rich, relevant, and formatted questions in seconds. Whether you're a teacher, student, or content creator, this tool can save hours of work.
        </p>
        <p>
          Our model is built on Google’s Gemini AI, ensuring high-quality and accurate results tailored to your input topic.
        </p>
      </section>

      <footer className="ai-footer">
        <p>© 2025 AI Question Generator. Built with ❤️ using React and Gemini AI.</p>
      </footer>
      </div>

      
    </div>
  );
}
