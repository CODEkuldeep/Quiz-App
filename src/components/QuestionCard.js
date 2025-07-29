// File: src/components/QuestionCard.js
import React, { useEffect, useState } from "react";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const QuestionCard = ({ questionData, selected, onSelect }) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (questionData) {
      const options = [...questionData.incorrect_answers];
      options.splice(
        Math.floor(Math.random() * 4),
        0,
        questionData.correct_answer
      );
      setShuffledOptions(options);
    }
  }, [questionData]);

  return (
    <div className="question-card">
      <h3>{decodeHtml(questionData.question)}</h3>
      <div className="options">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            className={`option-btn ${selected === opt ? "selected" : ""}`}
            onClick={() => onSelect(opt)}
            disabled={selected !== null}>
            {decodeHtml(opt)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
