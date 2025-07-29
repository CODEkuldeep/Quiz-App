// File: src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "./components/QuestionCard";
import ReportPage from "./components/ReportPage";
import NavigationPanel from "./components/NavigationPanel";
import "./App.css";

const TIMER_DURATION = 30 * 60; // 30 minutes in seconds

function App() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(15).fill(null));
  const [visited, setVisited] = useState(Array(15).fill(false));
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (submittedEmail) {
      axios.get("https://opentdb.com/api.php?amount=15").then((res) => {
        setQuestions(res.data.results);
      });
    }
  }, [submittedEmail]);

  useEffect(() => {
    if (!showReport && submittedEmail && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setShowReport(true);
    }
  }, [timer, showReport, submittedEmail]);

  const handleStart = () => {
    if (email.trim()) setSubmittedEmail(true);
  };

  const handleAnswer = (ans) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = ans;
    setAnswers(newAnswers);
  };

  const goToQuestion = (index) => {
    const newVisited = [...visited];
    newVisited[index] = true;
    setVisited(newVisited);
    setCurrentQ(index);
  };

  const finishQuiz = () => {
    setShowReport(true);
  };

  return (
    <div className="App">
      {!submittedEmail ? (
        <div className="start-screen">
          <h2>Enter your email to begin:</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <button onClick={handleStart}>Start Quiz</button>
        </div>
      ) : !showReport ? (
        <div>
          <div className="header">
            <div>Email: {email}</div>
            <div>
              Time Left: {Math.floor(timer / 60)}:
              {("0" + (timer % 60)).slice(-2)}
              <button
                className="toggle-theme-btn"
                onClick={() => {
                  document.body.classList.toggle("dark-mode");
                }}>
                Toggle Dark Mode
              </button>
            </div>
            <button onClick={finishQuiz}>Submit Now</button>
          </div>
          {questions.length > 0 && (
            <QuestionCard
              questionData={questions[currentQ]}
              selected={answers[currentQ]}
              onSelect={handleAnswer}
            />
          )}
          <NavigationPanel
            answers={answers}
            visited={visited}
            current={currentQ}
            goTo={goToQuestion}
          />
        </div>
      ) : (
        <ReportPage questions={questions} answers={answers} />
      )}
    </div>
  );
}

export default App;
