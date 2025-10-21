// QuizQuestion - render one question with shuffled choices

import { useMemo } from "react";
import clsx from "clsx";
import decodeHtml from "../utils/html";
import shuffleArray from "../utils/shuffleArray";

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

          // Compare decoded text
          const choiceValue = decodeHtml(choice);
          const selectedValue = decodeHtml(selected);

          const isSelected = choiceValue === selectedValue;

          const className = clsx("quiz-questions__choice-btn", {
            "quiz-questions__choice-btn--selected": isSelected,
          });

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
              <span className={className}>{decodeHtml(choice)}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default QuizQuestion;
