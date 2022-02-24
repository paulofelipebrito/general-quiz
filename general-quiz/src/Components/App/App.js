import {  useEffect,  useState } from 'react';
import {quizData} from '../../Mock/Questions'

import './App.css';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [question, setQuestion] = useState('');
  const [a_text, setA_text] = useState('');
  const [b_text, setB_text] = useState('');
  const [c_text, setC_text] = useState('');
  const [d_text, setD_text] = useState('');
  const [scoreA, setScoreA] = useState(0);

  useEffect(()=>{   
    if(currentQuiz >= quizData.length){  
      setCurrentQuiz((prevState)=> (prevState = 0));       
      setStartQuiz(false);
      setEndQuiz(true);
      
    }
    loadQuiz();
  }  
  ,[currentQuiz, startQuiz]);

  function handleStartQuiz() {
    setScoreA(0)
    setStartQuiz(true);
    setEndQuiz(false);
  }

  function handleSubmit(){   
    const [answer,score] = getSelected(scoreA); 
    setScoreA(score);   

    if(answer){
      if(currentQuiz < quizData.length){
        setCurrentQuiz((prevState)=> (prevState + 1)); 
      } else {
        setCurrentQuiz(0); 
        
      }
    }

    //console.log('dps do clique', currentQuiz,quizData.length)

  }

  function getSelected(lastscore){
    const answerElement = document.getElementsByClassName("answer");
    let radioChecked = false;
    let answer = '';
    let index = 0;
    let score = lastscore;

    for(let i = 0; i < answerElement.length; i= i+1){
      if(answerElement[i].checked){
        index = i;
        radioChecked = true;
        answer = answerElement[i].id;        
      }
    }
    if(radioChecked === false){
      alert("Please select an answer");
      return undefined;
    }else {      
      answerElement[index].checked = false;
      if(answer === quizData[currentQuiz].correct){
        score = lastscore +1;
      }
      return [answer, score];
    }
    
  }
   
  
  function loadQuiz(){
    
    let currentQuizData = quizData[currentQuiz];
    if(currentQuiz >= quizData.length){  
      currentQuizData = quizData[0];
    }

    setQuestion(currentQuizData.question);
    setA_text(currentQuizData.a);
    setB_text(currentQuizData.b);
    setC_text(currentQuizData.c);
    setD_text(currentQuizData.d);
    
   
  }
  return (
    <div className="App">
      <div className="quiz-container" id="quiz">
        {startQuiz && (<div className="quiz-header">
          <h2 id="question">{question}</h2>
          <ul>
            <li><input type="radio" id="a" name="answer" className="answer"/>
              <label htmlFor="a" id="a-text">
                {a_text}
              </label>
            </li>
            <li><input type="radio" id="b" name="answer" className="answer"/>
              <label htmlFor="b" id="b-text">
                {b_text}
              </label>
            </li>
            <li><input type="radio" id="c" name="answer" className="answer"/>
              <label htmlFor="c" id="c-text">
                {c_text}
              </label>
            </li>
            <li><input type="radio" id="d" name="answer" className="answer"/>
              <label htmlFor="d" id="d-text">
                {d_text}
              </label>
            </li>
          </ul>
        </div>)}

        {endQuiz === true && (<div className="Results">
          <h2>You finished the quiz! <br/> Get yourself a lemonade!</h2>
          <h3>You answered correctly at {scoreA}/{quizData.length} questions. </h3> 

        </div>)}

        {startQuiz === true ? (<button type="button" onClick={handleSubmit}>Submit</button>) : (<button type="button" onClick={handleStartQuiz}>Start Quiz</button>)}
        
        
      
      </div>
   </div>)
  }

export default App;
