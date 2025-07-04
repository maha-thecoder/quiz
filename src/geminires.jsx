import React,{useState} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './geminires.css';
import e from "cors";

export default function Geminires() {
  const history=useNavigate();

  const location = useLocation();
  const aiResponse = location.state?.aires || "";
  console.log(aiResponse);
  // Step 1: Split the AI response into separate question blocks
  const gemres = aiResponse.trim().split(/Question:/g).filter(Boolean);

  // Step 2: Parse each block into question and options
  const parsedres = gemres.map((block, index) => {
    const lines = block.trim().split('\n');
    const question = lines[0]?.trim();

    const options = {
      opt1: lines[1]?.replace(/^A\.\s*/, '').trim(),
      opt2: lines[2]?.replace(/^B\.\s*/, '').trim(),
      opt3: lines[3]?.replace(/^C\.\s*/, '').trim(),
      opt4: lines[4]?.replace(/^D\.\s*/, '').trim(),
    };

    const answerLine = lines.find(line => line.startsWith('Answer:'));
    const correctLetter = answerLine ? answerLine.split(':')[1].trim().toUpperCase() : "";

    let ans = '';
    switch (correctLetter) {
      case 'A': ans = options.opt1; break;
      case 'B': ans = options.opt2; break;
      case 'C': ans = options.opt3; break;
      case 'D': ans = options.opt4; break;
      default: ans = 'No answer';
    }

    return {
      id: index,
      question,
      ...options,
      ans
    };
  });

  const [editingid, setEditingId] = useState(null);
  const [Parsedres, setParsedres] = useState(parsedres);
  const [editedQuestion, setEditedQuestion] =useState({
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    ans: ""
  });
  const queseddit=(q)=>{
    setEditingId(q.id)
    setEditedQuestion({
      question: q.question,
      opt1: q.opt1,
      opt2: q.opt2,
      opt3: q.opt3,
      opt4: q.opt4,
      ans: q.ans
    })
  }

  const handleSave = () => {
    setParsedres(prev=>prev.map(q=>q.id===editingid?{...q,...editedQuestion}:q))
    setEditingId(null);
    setEditedQuestion({
      question: "",
      opt1: "",
      opt2: "",
      opt3: "",
      opt4: "",
      ans: ""
    });
  }


 
  const deleteQuestion = (id) => {
    const updatedQuestions = Parsedres.filter(q => q.id !== id);
    setParsedres(updatedQuestions);
  }
  const pagetransfer=()=>{
    history('/declaration',{state:{final:Parsedres}})
  }

  return (

    <div>
      <center><h3 className="mt-2">Here are the questions that are generated by AI</h3></center>
      <section className="instructions-section">
  <h4>Instructions:</h4>
  <ol>
    <li>You can edit the questions and options as per your requirement.</li>
    <li>Click on the <strong>Edit</strong> button to modify the question and options.</li>
    <li>Click on the <strong>Save</strong> button to save changes after editing.</li>
    <li>Click on the <strong>Delete</strong> button to remove the question.</li>
  </ol>
</section>

    <div className="container mt-4">
      {Parsedres.map(q => (
  <div key={q.id} className="card mb-3 p-3">

    {editingid === q.id ? (
      <div className="edit-form-inline">
        <h5>Edit Question</h5>
        <form>
          <label>Question:</label>
          <input type="text" value={editedQuestion.question} onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })} />
          <label>Option A:</label>
          <input type="text" value={editedQuestion.opt1} onChange={(e) => setEditedQuestion({ ...editedQuestion, opt1: e.target.value })} />
          <label>Option B:</label>
          <input type="text" value={editedQuestion.opt2} onChange={(e) => setEditedQuestion({ ...editedQuestion, opt2: e.target.value })} />
          <label>Option C:</label>
          <input type="text" value={editedQuestion.opt3} onChange={(e) => setEditedQuestion({ ...editedQuestion, opt3: e.target.value })} />
          <label>Option D:</label>
          <input type="text" value={editedQuestion.opt4} onChange={(e) => setEditedQuestion({ ...editedQuestion, opt4: e.target.value })} />
          <label>Correct Answer:</label>
          <input type="text" value={editedQuestion.ans} onChange={(e) => setEditedQuestion({ ...editedQuestion, ans: e.target.value })} />
        </form>
        <div className="btn-2 mt-2">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    ) : (
      <>
        <h5>{q.question}</h5>
        <ul>
          <li>A. {q.opt1}</li>
          <li>B. {q.opt2}</li>
          <li>C. {q.opt3}</li>
          <li>D. {q.opt4}</li>
        </ul>
        <strong>Answer: {q.ans}</strong>
        <div className="btn-2">
          <button onClick={() => queseddit(q)}>Edit</button>
          <button onClick={()=>deleteQuestion(q.id)}>Delete</button>
        </div>
      </>
    )}
  </div>
))}

      
        </div>
        <center><div>
      <button className="generating" onClick={pagetransfer}>
        Continue
      </button>
    </div></center>
        </div>
     

  
      

  );
}
