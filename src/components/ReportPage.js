// File: src/components/ReportPage.js
import React from "react";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const ReportPage = ({ questions, answers }) => {
  return (
    <div className="report-page">
      <h2>Quiz Report</h2>
      {questions.map((q, idx) => {
        const userAnswer = answers[idx];
        const correctAnswer = q.correct_answer;
        const isCorrect = userAnswer === correctAnswer;

        return (
          <div key={idx} className="report-question">
            <h4>
              Q{idx + 1}: {decodeHtml(q.question)}
            </h4>
            <p>
              <strong>Your Answer:</strong>{" "}
              <span className={isCorrect ? "correct" : "incorrect"}>
                {decodeHtml(userAnswer || "Not Answered")}
              </span>
            </p>
            <p>
              <strong>Correct Answer:</strong> {decodeHtml(correctAnswer)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ReportPage;
