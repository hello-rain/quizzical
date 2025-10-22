// QuizQuestion - render one question with shuffled choices

import { useMemo } from "react";
import clsx from "clsx";
import decodeHtml from "../utils/html";
import shuffleArray from "../utils/shuffleArray";

function QuizQuestion({
  question,
  questionIndex,
  selected,
  onAnswer,
  isSubmitted,
  questionResult,
}) {
  if (!question) return null;

  // Shuffle choices once. Re-run when the question changes.
  const choices = useMemo(() => {
    const allChoices = [
      question.correct_answer,
      ...(question.incorrect_answers || []),
    ];
    return shuffleArray(allChoices);
  }, [question]);

  return (
    <fieldset className="quiz-questions__item">
      <legend className="quiz-questions__title">
        {decodeHtml(question.question)}
      </legend>
      <div className="quiz-questions__choices">
        {choices.map((choice, choiceIndex) => {
          const id = `q-${questionIndex}-opt-${choiceIndex}`;

          // Decode for display / comparison
          const choiceValue = decodeHtml(choice); // decoded text for this choice
          const selectedValue = decodeHtml(selected ?? ""); // live selected from props (pre-submit)

          const isSelectedBeforeSubmit = choiceValue === selectedValue;

          // after submit, use the graded result snapshot
          const graded = questionResult ?? null;
          const correctChoice = question.correct_answer;
          const gradedSelected = graded?.selectedAnswer ?? null; // snapshot after grading

          const isSelectedAfterSubmit = choiceValue === gradedSelected;

          const isSelected = !isSubmitted && isSelectedBeforeSubmit;
          const isCorrect = isSubmitted && correctChoice === choiceValue;
          const isIncorrect =
            isSubmitted &&
            isSelectedAfterSubmit &&
            correctChoice != choiceValue;

          const className = clsx("quiz-questions__choice-btn", {
            // Only show the visual 'selected' state before submitting
            "quiz-questions__choice-btn--selected": isSelected,

            // After submitting, show the grading feedback
            "quiz-questions__choice-btn--correct": isCorrect,
            "quiz-questions__choice-btn--incorrect": isIncorrect,
          });
          return (
            <label key={id} className="quiz-questions__choice" htmlFor={id}>
              <input
                id={id}
                type="radio"
                name={`q-${questionIndex}`}
                value={choice}
                checked={selected === choice} // true => this radio is selected
                disabled={isSubmitted}
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
