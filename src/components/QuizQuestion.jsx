// QuizQuestion - render one question with shuffled choices

import { useMemo } from "react";

// Fisher-Yates shuffle - non-mutating: returns a new shuffled array
function shuffleArray(arr) {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Decode HTML entities returned by the API into plain text
function decodeHtml(html) {
  if (typeof document === "undefined") return html;
  const text = document.createElement("textarea");
  text.innerHTML = html;
  return text.value;
}

function QuizQuestion({ question, questionIndex, selected, onAnswer }) {
  if (!question) return null;

  // Shuffle choices once. Re-run when the question changes.
  const choices = useMemo(() => {
    const allChoices = [
      question.correct_answer,
      ...(question.incorrect_answers || []),
    ];
    return shuffleArray(allChoices);
  }, [question.question]);

  return (
    <fieldset className="quiz-questions__item">
      <legend className="quiz-questions__title">
        {decodeHtml(question.question)}
      </legend>
      <div className="quiz-questions__choices">
        {choices.map((choice, choiceIndex) => {
          const id = `q-${questionIndex}-opt-${choiceIndex}`;
          return (
            <label key={id} className="quiz-questions__choice" htmlFor={id}>
              <input
                id={id}
                type="radio"
                name={`q-${questionIndex}`}
                value={choice}
                checked={selected === choice} // true => this radio is selected
                onChange={() => onAnswer && onAnswer(questionIndex, choice)} // save answer
              />
              <span className="quiz-questions__choice-btn">
                {decodeHtml(choice)}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default QuizQuestion;

// category: "General Knowledge";
// correct_answer: "Swiss Air";
// difficulty: "easy";
// incorrect_answers: (3)[("Air France", "British Airways", "TWA")];
// question: "What airline was the owner of the plane that crashed off the coast of Nova Scotia in 1998?";
// type: "multiple";
