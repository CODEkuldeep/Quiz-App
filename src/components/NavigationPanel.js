// File: src/components/NavigationPanel.js
import React from "react";

const NavigationPanel = ({ answers, visited, current, goTo }) => {
  return (
    <div className="navigation-panel">
      <h4>Navigate Questions:</h4>
      <div className="nav-buttons">
        {answers.map((_, idx) => {
          let status = "unvisited";
          if (answers[idx]) status = "answered";
          else if (visited[idx]) status = "visited";

          return (
            <button
              key={idx}
              className={`nav-btn ${status} ${
                current === idx ? "current" : ""
              }`}
              onClick={() => goTo(idx)}>
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationPanel;
